import env from '#start/env'
import type { GameClientBuildFile } from '#types/s3_types'
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import type { ListObjectsV2CommandOutput, _Object } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

/**
 * Service pour interagir avec OVH Object Storage (compatible S3) pour gérer les fichiers de builds de clients de jeu
 * Ce service utilise le SDK AWS pour S3, configuré pour fonctionner avec OVH Object Storage
 */
export default class S3Service {
  /**
   * Client S3 configuré pour OVH Object Storage, avec les informations d'identification et l'endpoint spécifiés dans les variables d'environnement
   */
  private static readonly client = new S3Client({
    region: env.get('S3_BUCKET_OVH_REGION'),
    endpoint: env.get('S3_BUCKET_OVH_ENDPOINT'),
    credentials: {
      accessKeyId: env.get('S3_BUCKET_OVH_ACCESS_KEY_ID'),
      secretAccessKey: env.get('S3_BUCKET_OVH_SECRET_ACCESS_KEY'),
    },
  })

  /**
   * Nom du bucket chez OVH
   */
  private static readonly bucket = env.get('S3_BUCKET_OVH_NAME')

  /**
   * Préfixe pour lister les fichiers des builds de clients de jeu dans le bucket OVH
   */
  private static readonly prefix = env.get('S3_BUCKET_OVH_LIST_FILES_GAMECLIENT_AETHER_ROYALE')

  /**
   * Durée d'expiration des URLs de téléchargement signées, en secondes.
   */
  private static readonly signedUrlExpiresIn = env.get('S3_BUCKET_OVH_SIGNED_URL_EXPIRES_SECONDS')

  /**
   * Liste les builds de clients de jeu disponibles dans le bucket OVH, avec des URLs de téléchargement signées
   * @returns {Promise<GameClientBuildFile[]>} Une liste d'objets représentant les fichiers de builds de clients de jeu, avec leurs métadonnées et URLs de téléchargement signées
   */
  public static async listGameClientBuilds(): Promise<GameClientBuildFile[]> {
    // Commande pour lister les objets dans le bucket OVH avec le préfixe spécifié
    const command: ListObjectsV2Command = new ListObjectsV2Command({
      Bucket: this.bucket, // Nom du bucket OVH
      Prefix: this.prefix, // Préfixe pour filtrer les fichiers de builds de clients de jeu
    })

    // Exécution de la commande pour récupérer la liste des objets
    const response: ListObjectsV2CommandOutput = await this.client.send(command)

    // Extraction des objets retournés par OVH, en filtrant les dossiers (objets dont la clé se termine par '/')
    const contents: _Object[] = response.Contents ?? []

    // Pour chaque objet, on génère une URL de téléchargement signée et on extrait les informations pertinentes
    const files: GameClientBuildFile[] = await Promise.all(
      contents
        .filter((o: _Object) => o.Key && !o.Key.endsWith('/'))
        .map(async (o: _Object): Promise<GameClientBuildFile> => {
          // Extraction du nom de fichier à partir de la clé de l'objet
          // Exemple de clé : "clients/staging/gameclient-abc123.zip" -> filename : "gameclient-abc123.zip"
          const key: string = o.Key!
          const filename: string = key.split('/').pop()!

          // Extraction du commit SHA à partir du nom de fichier, en supposant qu'il est précédé d'un tiret et suivi de 7 à 40 caractères hexadécimaux
          // Exemple : "gameclient-staging-abc123.zip" -> commitSha : "abc123"
          const shaMatch: RegExpMatchArray | null = filename.match(/-([0-9a-f]{7,40})/i)
          const commitSha: string | null = shaMatch ? shaMatch[1] : null

          // Génération de l'URL de téléchargement signée pour l'objet
          const command: GetObjectCommand = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
          })
          const urlSigned: string = await getSignedUrl(this.client, command, {
            expiresIn: this.signedUrlExpiresIn, // Durée d'expiration de l'URL signée
          })

          // Construction de l'objet GameClientBuildFile avec les informations extraites et l'URL signée
          return {
            filename,
            commitSha,
            size: o.Size ?? null,
            lastModified: o.LastModified ?? null,
            downloadUrl: urlSigned,
          }
        }),
    )

    // tri du plus récent au plus ancien
    files.sort((a: GameClientBuildFile, b: GameClientBuildFile) =>
      (b.lastModified?.toISOString() ?? '').localeCompare(a.lastModified?.toISOString() ?? ''),
    )

    // Limite aux 15 dernières releases, puis retourne la liste des fichiers de builds de clients de jeu avec leurs métadonnées et URLs de téléchargement signées
    const MAX_RELEASES: number = 15
    return files.slice(0, MAX_RELEASES)
  }
}
