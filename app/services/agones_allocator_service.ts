import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import env from '#start/env'
import path from 'path'
import type { ProtoGrpcType } from '#agones/allocation'
import type { AllocationRequest } from '#agones/allocation/AllocationRequest'
import type { AllocationResponse__Output } from '#agones/allocation/AllocationResponse'
import type { AllocationServiceClient } from '#agones/allocation/AllocationService'
import logger from '@adonisjs/core/services/logger'

/**
 * Structure du projet attendue :
 *
 * MonProjet/
 * ├─ agones-allocator/
 * │   └─ proto/
 * │       └─ allocation/
 * │           └─ allocation.proto
 *
 * On pointe vers le fichier proto officiel d’Agones.
 */
const protoPath: string = path.join(
  process.cwd(),
  'agones-allocator',
  'proto',
  'allocation',
  'allocation.proto', // Proto officiel Agones 1.55.0
)

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
      // Token Quilkin qui permettra le routage UDP vers le bon GameServer dans la Fleet, token à générer par le backend, exemple :
      'quilkin.dev/tokens': 'MDAwMDAwMDAwMDAwMDQ1Ng==', // # Base64 de 0000000000000456 = MDAwMDAwMDAwMDAwMDQ1Ng== (16 bytes)
    },
  },
}

/**
 * Appel gRPC vers Agones Allocator.
 *
 * Allocation d’un GameServer READY dans la Fleet.
 *
 * NOTE :
 * La méthode s’appelle "Allocate" (majuscule),
 * car c’est le nom défini dans le .proto.
 */
client.Allocate(request, (err: grpc.ServiceError | null, response: AllocationResponse__Output): void => {
  if (err) {
    logger.error({ err }, 'Agones allocation error')
    return
  }

  /**
   * Réponse typique :
   * {
   *   gameServerName: "...",
   *   address: "10.x.x.x",
   *   ports: [...],
   *   nodeName: "...",
   *   metadata: {...}
   * }
   *
   * ⚠️ Si tu utilises Quilkin :
   * Le client jeu n’utilisera PAS cette adresse.
   * Il se connectera au LoadBalancer Quilkin à la place.
   */
  logger.info({ response }, 'Allocated GameServer')
})
