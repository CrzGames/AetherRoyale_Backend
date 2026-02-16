import type { HttpContext } from '@adonisjs/core/http'
import S3Service from '#services/s3_service'
import type { GameClientBuildFile } from '#types/s3_types'

/**
 * Contrôleur pour les opérations liées à S3 (OVH Object Storage)
 */
export default class S3Controller {
  /**
   * GET /s3/list-game-client-builds
   */
  public async listGameClientBuilds({ response }: HttpContext): Promise<void> {
    const files: GameClientBuildFile[] = await S3Service.listGameClientBuilds()
    return response.ok(files)
  }
}
