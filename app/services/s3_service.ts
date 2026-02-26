import env from '#start/env'
import type { GameClientBuildFile } from '#types/s3_types'
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import type { ListObjectsV2CommandOutput, _Object } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

/**
 * Service pour interagir avec OVH Object Storage (S3 compatible)
 * Liste les builds Game Client (staging/production) + URLs signées.
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
   * Ex: "gameclient-aetherroyale/binaries"
   */
  private static readonly basePrefix = env.get('S3_BUCKET_OVH_LIST_FILES_GAMECLIENT_AETHER_ROYALE')

  /**
   * Durée d'expiration des URLs de téléchargement signées, en secondes.
   */
  private static readonly signedUrlExpiresIn = ((): number => {
    const raw: number = env.get('S3_BUCKET_OVH_SIGNED_URL_EXPIRES_SECONDS')
    const n: number = Number.parseInt(String(raw), 10)
    return Number.isFinite(n) && n > 0 ? n : 3600
  })()

  /**
   * Liste les builds de clients de jeu disponibles dans le bucket OVH, avec des URLs de téléchargement signées
   * @returns {Promise<GameClientBuildFile[]>} Une liste d'objets représentant les fichiers de builds de clients de jeu, avec leurs métadonnées et URLs de téléchargement signées
   */
  private static async listAllObjects(prefix: string): Promise<_Object[]> {
    // Liste tous les objets S3 sous le préfixe donné, en gérant la pagination
    const out: _Object[] = []
    let continuationToken: string | undefined = undefined

    do {
      // Commande pour lister les objets S3 avec pagination
      const command: ListObjectsV2Command = new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })

      // Exécution de la commande et récupération de la réponse
      const response: ListObjectsV2CommandOutput = await this.client.send(command)

      // Ajout des objets récupérés à la liste finale
      const contents: _Object[] = response.Contents ?? []

      // Important: on ajoute les résultats de chaque page à la liste finale, au lieu de remplacer la liste à chaque itération
      out.push(...contents)

      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined
    } while (continuationToken)

    return out
  }

  /**
   * Parse une clé selon tes 2 conventions:
   * - staging:  .../staging/<version>-staging-<sha>/aetherroyale-<platform>-<arch>-<version>-staging-<sha>.zip
   * - prod:     .../production/<version>/aetherroyale-<platform>-<arch>-<version>.zip
   *
   * @param {string} key - La clé S3 à parser
   * @returns {object} Un objet contenant les informations extraites de la clé, ou null si la clé ne correspond à aucune convention
   */
  private static parseKey(key: string): {
    environment: 'staging' | 'production' | null
    version: string | null
    commitSha: string | null
    platform: string | null
    arch: string | null
    filename: string
  } {
    const parts: string[] = key.split('/').filter(Boolean)
    const filename: string = parts.at(-1) ?? key

    const envIndex: number = parts.findIndex((p: string) => p === 'staging' || p === 'production')
    const environment: 'staging' | 'production' | null =
      envIndex >= 0 ? (parts[envIndex] as 'staging' | 'production') : null

    let version: string | null = null
    let commitSha: string | null = null
    const releaseFolder: string | null = envIndex >= 0 ? (parts[envIndex + 1] ?? null) : null

    if (environment === 'staging' && releaseFolder) {
      const m: RegExpMatchArray | null = releaseFolder.match(
        /^(?<version>\d+\.\d+\.\d+)-staging-(?<sha>[0-9a-f]{7,40})$/i,
      )
      if (m?.groups) {
        version = m.groups.version
        commitSha = m.groups.sha
      }
    } else if (environment === 'production' && releaseFolder) {
      const m: RegExpMatchArray | null = releaseFolder.match(/^(?<version>\d+\.\d+\.\d+)$/i)
      if (m?.groups) version = m.groups.version
    }

    // 1) Format "2 segments": <name>-<platform>-<arch>-<version>(-staging-<sha>).zip
    const stagingFile2: RegExpMatchArray | null = filename.match(
      /-(?<platform>[a-z0-9]+)-(?<arch>[a-z0-9]+)-(?<v>\d+\.\d+\.\d+)-staging-(?<sha>[0-9a-f]{7,40})\.zip$/i,
    )
    const prodFile2: RegExpMatchArray | null = filename.match(
      /-(?<platform>[a-z0-9]+)-(?<arch>[a-z0-9]+)-(?<v>\d+\.\d+\.\d+)\.zip$/i,
    )

    // 2) Format mobile "1 segment": <name>-<platform>-<version>(-staging-<sha>).zip  (platform=android|ios)
    const stagingFile1: RegExpMatchArray | null = filename.match(
      /-(?<platform>android|ios)-(?<v>\d+\.\d+\.\d+)-staging-(?<sha>[0-9a-f]{7,40})\.zip$/i,
    )
    const prodFile1: RegExpMatchArray | null = filename.match(/-(?<platform>android|ios)-(?<v>\d+\.\d+\.\d+)\.zip$/i)

    let platform: string | null = null
    let arch: string | null = null

    if (stagingFile1?.groups) {
      platform = stagingFile1.groups.platform
      arch = null
      version = version ?? stagingFile1.groups.v
      commitSha = commitSha ?? stagingFile1.groups.sha
    } else if (prodFile1?.groups) {
      platform = prodFile1.groups.platform
      arch = null
      version = version ?? prodFile1.groups.v
    } else if (stagingFile2?.groups) {
      platform = stagingFile2.groups.platform
      arch = stagingFile2.groups.arch
      version = version ?? stagingFile2.groups.v
      commitSha = commitSha ?? stagingFile2.groups.sha
    } else if (prodFile2?.groups) {
      platform = prodFile2.groups.platform
      arch = prodFile2.groups.arch
      version = version ?? prodFile2.groups.v
    }

    return { environment, version, commitSha, platform, arch, filename }
  }

  /**
   * Génère une URL de téléchargement signée pour un objet S3 donné, en utilisant la commande GetObjectCommand et la fonction getSignedUrl du SDK AWS
   * @param {string} key - La clé S3 de l'objet pour lequel générer l'URL signée
   * @returns {Promise<string>} L'URL de téléchargement signée, valide pendant la durée spécifiée dans signedUrlExpiresIn
   */
  private static async signGetUrl(key: string): Promise<string> {
    // Commande pour obtenir l'objet S3 spécifié par la clé
    const command: GetObjectCommand = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    })

    // Génération de l'URL de téléchargement signée, avec une expiration définie par signedUrlExpiresIn
    return getSignedUrl(this.client, command, { expiresIn: this.signedUrlExpiresIn })
  }

  /**
   * Liste toutes les builds (staging + production).
   * - Pas de limite arbitraire.
   * - Triées du plus récent au plus ancien.
   * - Robuste si des fichiers/dossiers sont supprimés.
   *
   * @returns {Promise<GameClientBuildFile[]>} Une liste d'objets représentant les fichiers de builds de clients de jeu, avec leurs métadonnées et URLs de téléchargement signées
   */
  public static async listGameClientBuilds(): Promise<GameClientBuildFile[]> {
    // On liste sous "gameclient-aetherroyale/binaries/" pour récupérer staging + production en une passe.

    // Important: s'assurer que le préfixe se termine par "/" pour éviter de récupérer des objets hors du scope (ex: "gameclient-aetherroyale/binaries-old/")
    const prefix: string = this.basePrefix.endsWith('/') ? this.basePrefix : `${this.basePrefix}/`

    // Récupère tous les objets S3 sous le préfixe donné, en gérant la pagination
    const objects: _Object[] = await this.listAllObjects(prefix)

    // Filtre pour ne garder que les fichiers (exclut les "dossiers" qui ont des clés se terminant par "/")
    const filesOnly: (_Object & {
      Key: string
    })[] = objects.filter((o: _Object) => o.Key && !o.Key.endsWith('/')) as Array<_Object & { Key: string }>

    const builds: GameClientBuildFile[] = await Promise.all(
      filesOnly.map(
        async (
          o: _Object & {
            Key: string
          },
        ) => {
          const key: string = o.Key
          const parsed: {
            environment: 'staging' | 'production' | null
            version: string | null
            commitSha: string | null
            platform: string | null
            arch: string | null
            filename: string
          } = this.parseKey(key)

          const downloadUrl: string = await this.signGetUrl(key)

          const item: GameClientBuildFile = {
            key,
            filename: parsed.filename,
            downloadUrl,
            size: o.Size ?? null,
            lastModified: o.LastModified ?? null,
            environment: parsed.environment,
            version: parsed.version,
            commitSha: parsed.commitSha,
            platform: parsed.platform,
            arch: parsed.arch,
          }

          return item
        },
      ),
    )

    builds.sort((a: GameClientBuildFile, b: GameClientBuildFile) => {
      const da: number = a.lastModified?.getTime() ?? 0
      const db: number = b.lastModified?.getTime() ?? 0
      return db - da
    })

    return builds
  }

  /**
   * Option pratique: lister uniquement staging ou uniquement production
   * Permet de réduire le nombre d'objets à traiter si on sait qu'on veut que les builds d'un environnement spécifique, et ainsi améliorer les performances.
   * @param {('staging' | 'production')} environment - L'environnement pour lequel lister les builds (staging ou production)
   * @returns {Promise<GameClientBuildFile[]>} Une liste d'objets représentant les fichiers de builds de clients de jeu pour l'environnement spécifié, avec leurs métadonnées et URLs de téléchargement signées
   */
  public static async listGameClientBuildsByEnv(environment: 'staging' | 'production'): Promise<GameClientBuildFile[]> {
    const base: string = this.basePrefix.endsWith('/') ? this.basePrefix.slice(0, -1) : this.basePrefix
    const prefix: string = `${base}/${environment}/`

    const objects: _Object[] = await this.listAllObjects(prefix)
    const filesOnly: (_Object & {
      Key: string
    })[] = objects.filter((o: _Object) => o.Key && !o.Key.endsWith('/')) as Array<_Object & { Key: string }>

    const builds: GameClientBuildFile[] = await Promise.all(
      filesOnly.map(
        async (
          o: _Object & {
            Key: string
          },
        ) => {
          const key: string = o.Key
          const parsed: {
            environment: 'staging' | 'production' | null
            version: string | null
            commitSha: string | null
            platform: string | null
            arch: string | null
            filename: string
          } = this.parseKey(key)
          const downloadUrl: string = await this.signGetUrl(key)

          return {
            key,
            filename: parsed.filename,
            downloadUrl,
            size: o.Size ?? null,
            lastModified: o.LastModified ?? null,
            environment: parsed.environment,
            version: parsed.version,
            commitSha: parsed.commitSha,
            platform: parsed.platform,
            arch: parsed.arch,
          } as GameClientBuildFile
        },
      ),
    )

    builds.sort((a: GameClientBuildFile, b: GameClientBuildFile) => {
      const da: number = a.lastModified?.getTime() ?? 0
      const db: number = b.lastModified?.getTime() ?? 0
      return db - da
    })
    return builds
  }
}
