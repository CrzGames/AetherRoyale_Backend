/**
 * Types liés aux fichiers de builds de clients de jeu stockés dans le bucket OVH Object Storage (compatible S3)
 * Ces types sont utilisés pour structurer les données retournées par S3Service.listGameClientBuilds()
 */
export type GameClientBuildFile = {
  key: string
  filename: string
  downloadUrl: string
  size: number | null
  lastModified: Date | null
  environment: 'staging' | 'production' | null
  version: string | null
  commitSha: string | null // staging uniquement en pratique
  platform: string | null // windows | linux | macos | ios | android | steamrt4...
  arch: string | null // x64 | arm64 ...
}
