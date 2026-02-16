import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import env from '#start/env'
import path from 'path'
import type { ProtoGrpcType } from '#agones/allocation'
import type { AllocationRequest } from '#agones/allocation/AllocationRequest'
import type { AllocationResponse__Output } from '#agones/allocation/AllocationResponse'
import type { AllocationServiceClient } from '#agones/allocation/AllocationService'
import logger from '@adonisjs/core/services/logger'
import crypto from 'node:crypto'
import EncryptionService from '#services/encryption_service'
import type { AllocationSecurityData, MatchTokenBase64, UdpEncryptionKeyBase64 } from '#types/agones_types'

/**
 * Génère un token de session unique (16 bytes / 128 bits) encodé en base64.
 *
 * Ce token est créé par le backend au moment de l’allocation d’un GameServer
 * via l’Agones Allocator, puis injecté dans l’annotation Kubernetes :
 *
 *   "quilkin.dev/tokens": "<token_base64>"
 *
 * Rôle du token :
 * - Identifier de manière unique un match / une allocation.
 * - Permettre à Quilkin de router les paquets UDP vers le GameServer correct
 *   via le filtre TokenRouter.
 * - Éviter tout conflit de routage entre plusieurs GameServers d’une même Fleet.
 *
 * Flux complet :
 * 1) Le backend génère ce token aléatoire (16 bytes).
 * 2) Il l’enregistre dans l’annotation du GameServer lors de l’allocation.
 * 3) Il renvoie ce token (base64) au client de jeu via l’API HTTP.
 * 4) Le client décode le base64 pour récupérer les 16 bytes binaires.
 * 5) Le client ajoute ces 16 bytes en suffixe de chaque paquet UDP envoyé à Quilkin.
 * 6) Quilkin extrait ce token (Capture filter) puis route le paquet vers le bon GameServer.
 *
 * Format :
 * - 16 bytes binaires générés cryptographiquement (crypto.randomBytes).
 * - Encodés en base64 uniquement pour le transport (API / annotations Kubernetes).
 * - L’unicité est garantie en pratique par l’entropie de 128 bits.
 *
 * Important :
 * - Un token DOIT être unique par allocation/match.
 * - Il ne doit jamais être hardcodé.
 * - Il doit idéalement expirer à la fin du match.
 *
 * @returns {string} Token aléatoire encodé en base64 (représentant 16 bytes)
 */
const generateMatchToken: () => string = (): string => {
  return crypto.randomBytes(16).toString('base64')
}

/**
 * Répertoire racine contenant les fichiers .proto de l'Agones Allocator.
 *
 * On se base sur process.cwd() car :
 * - En local comme en Docker, le backend est lancé depuis la racine du projet.
 * - Dans le container, le projet est monté sous /app, donc :
 *     process.cwd() === "/app"
 *
 * Structure attendue :
 *
 * /app/
 * └─ agones-allocator/
 *    └─ proto/
 *       └─ allocation/
 *          ├─ allocation.proto
 *          ├─ google/
 *          │   └─ api/
 *          │       ├─ annotations.proto
 *          │       └─ http.proto
 *          └─ protoc-gen-openapiv2/
 *              └─ options/
 *                  ├─ annotations.proto
 *                  └─ openapiv2.proto
 *
 * Ce dossier est utilisé comme racine d'import pour @grpc/proto-loader
 * via l'option `includeDirs`, afin de résoudre correctement :
 *   import "google/api/annotations.proto";
 *   import "protoc-gen-openapiv2/options/annotations.proto";
 */
const allocationDir = path.join(process.cwd(), 'agones-allocator', 'proto', 'allocation')

/**
 * Chemin absolu vers le proto principal de l'Agones Allocator.
 *
 * Ce fichier définit :
 * - Le service gRPC AllocationService
 * - Les messages AllocationRequest / AllocationResponse
 *
 * Il est chargé par @grpc/proto-loader, qui résout ensuite automatiquement
 * les imports internes grâce à includeDirs: [allocationDir].
 */
const protoPath: string = path.join(allocationDir, 'allocation.proto')

/**
 * Charge le fichier .proto et le transforme en définition exploitable par gRPC.
 *
 * Options importantes :
 * - keepCase: garde les noms tels quels (matchLabels, gameServerSelectors, etc.)
 * - longs: String → évite les types Long.js compliqués
 * - enums: String → plus lisible en debug
 * - defaults: true → initialise les champs vides
 * - oneofs: true → support des unions proto3
 */
const packageDefinition: protoLoader.PackageDefinition = protoLoader.loadSync(protoPath, {
  // 👇 IMPORTANT : on dit à proto-loader où chercher les imports ("google/...", "protoc-gen-openapiv2/...")
  includeDirs: [allocationDir],

  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

/**
 * Conversion de la définition proto en objet JS utilisable.
 *
 * Le package dans le proto est :
 *   package allocation;
 *
 * Donc on récupère :
 *   .allocation.AllocationService
 */
const proto: ProtoGrpcType = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType

/**
 * Création du client gRPC vers l’Agones Allocator.
 *
 * Endpoint interne Kubernetes :
 *   agones-allocator.agones-system.svc:443
 *
 * - Service type ClusterIP
 * - Communication interne au cluster uniquement
 *
 * createInsecure() est OK car :
 * - Backend IN-CLUSTER
 * - Pas exposé à Internet
 * - Pas de mTLS/TLS configuré
 */
const client: AllocationServiceClient = new proto.allocation.AllocationService(
  env.get('AGONES_ALLOCATOR_ENDPOINT_GRPC'),
  grpc.credentials.createInsecure(), // ← PLAINTEXT, puisque nous utilisons sans MTLS / TLS
)

/**
 * Fonction pour allouer un GameServer via l’Agones Allocator.
 * @returns {Promise<AllocationSecurityData>} - Une promesse qui retourne les données de sécurité (token de match + clé de chiffrement UDP) à transmettre au client de jeu.
 */
export const allocateGameServerInFleet: () => Promise<AllocationSecurityData> =
  async (): Promise<AllocationSecurityData> => {
    /**
     * Génération d’un token de match unique pour l’allocation d’un GameServer,
     * à injecter dans les annotations Kubernetes et à transmettre au client de jeu.
     */
    const matchTokenBase64: MatchTokenBase64 = generateMatchToken()

    /**
     * Génère une clé de chiffrement symétrique unique (XChaCha20-Poly1305) pour sécuriser
     * la communication UDP entre le client et le GameServer pour ce match précis.
     *
     * Cette clé est spécifique à l’allocation en cours (par match) et sera :
     * 1) Transmise au client via l’API HTTPS / WebSocket.
     * 2) Injectée dans les annotations du GameServer via l’Agones Allocator.
     * 3) Récupérée côté GameServer via le SDK Agones afin de pouvoir déchiffrer
     *    les paquets UDP entrants et chiffrer les réponses.
     *
     * Utilisation côté réseau :
     * - Le client chiffre le payload des paquets UDP avec cette clé.
     * - Le GameServer déchiffre les paquets reçus avec la même clé.
     *
     * Portée et sécurité :
     * - Clé générée aléatoirement et unique par allocation/match.
     * - Encodée en base64 uniquement pour le transport (API / annotations Kubernetes).
     * - Décodée en bytes côté client et côté GameServer avant utilisation.
     * - Idéalement valable uniquement pendant la durée du match (clé jetable).
     *
     * IMPORTANT :
     * - Cette clé ne doit jamais être hardcodée.
     * - Elle ne doit pas être loguée.
     * - Elle doit être différente pour chaque allocation afin d’éviter toute réutilisation
     *   entre matchs et limiter l’impact en cas de compromission.
     */
    const udpEncryptionKeyBase64: UdpEncryptionKeyBase64 = await EncryptionService.generateEncryptionKey()

    /**
     * Requête pour allouer un GameServer.
     */
    const request: AllocationRequest = {
      // Namespace Kubernetes qui contient tes Fleets / GameServers
      namespace: env.get('AGONES_GAMESERVERS_NAMESPACE'),

      // Sélection du GameServer à allouer (typiquement via la Fleet)
      gameServerSelectors: [
        {
          matchLabels: {
            // Match la Fleet ciblée via son nom exact
            'agones.dev/fleet': env.get('AGONES_FLEET_NAME'),
          },
        },
      ],

      // Patch metadata appliqué au GameServer *au moment de l'allocation*
      metadata: {
        annotations: {
          // Injection du token de match unique dans les annotations Kubernetes du GameServer alloué
          'quilkin.dev/tokens': matchTokenBase64,
          // Injection de la clé de chiffrement symétrique unique pour les paquets UDP
          'crzgames.dev/udp-encryption-key': udpEncryptionKeyBase64,
        },
      },
    }

    /**
     * Appel gRPC vers Agones Allocator.
     *
     * Allocation d’un GameServer READY dans la Fleet.
     */
    const response: AllocationResponse__Output = await new Promise<AllocationResponse__Output>(
      (resolve: (value: AllocationResponse__Output) => void, reject: (reason?: unknown) => void): void => {
        client.Allocate(request, (err: grpc.ServiceError | null, response: AllocationResponse__Output): void => {
          if (err) {
            logger.error({ err }, 'Agones allocation error')
            reject(err)
            return
          }
          resolve(response)
        })
      },
    )

    // Log safe (sans token et clé de chiffrement) de l’allocation réussie avec les infos du GameServer
    logger.info(
      {
        gameServerName: response.gameServerName,
        nodeName: response.nodeName,
      },
      'Allocated GameServer',
    )

    // Retourne les données de sécurité nécessaires au client de jeu pour communiquer avec le GameServer alloué
    return {
      matchTokenBase64,
      udpEncryptionKeyBase64,
    }
  }
