/**
 * Types liés aux fichiers de builds de clients de jeu stockés dans le bucket OVH Object Storage (compatible S3)
 * Ces types sont utilisés pour structurer les données retournées par S3Service.listGameClientBuilds()
 */
export type GameClientBuildFile = {
  filename: string
  commitSha: string | null
  size: number | null
  lastModified: Date | null
  downloadUrl: string
}
