import type { MatchmakingJoinRequestBody } from '#interfaces/matchmaking_request_body_interfaces'
import type { ModeKey } from '#services/matchmaking_redis_service'
import { MatchmakingRedisService } from '#services/matchmaking_redis_service'
import { matchmakingJoinValidator } from '#validators/matchmaking_validator'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Controller pour la gestion du matchmaking
 * @class MatchmakingController
 */
export default class MatchmakingController {
  /**
   * @MatchmakingJoin
   * @operationId matchmakingJoin
   * @tag Matchmaking
   * @summary Rejoindre une partie de matchmaking
   * @description Gère les requêtes de rejoindre une partie de matchmaking
   * @requestBody <MatchmakingJoinRequestBody>
   * @content application/json
   * @responseBody 202 - <SuccessResponseBody> - Rejoint la file d'attente de matchmaking
   * @responseBody 422 - <ValidationErrorResponseBody> - Erreurs de validation des données
   * @responseBody 500 - <ErrorResponseBody> - Erreur interne du serveur
   */
  /**
   * Manage matchmaking join requests
   * @param {HttpContext} ctx - The HTTP context containing the request and response objects
   * @param {HttpContext['request']} ctx.request - The HTTP request object
   * @param {HttpContext['response']} ctx.response - The HTTP response object
   * @param {HttpContext['auth']} ctx.auth - The authentication object containing the authenticated user
   * @returns {Promise<void>} - A promise that resolves with no return value
   */
  public async matchmakingJoin({ request, response, auth }: HttpContext): Promise<void> {
    // Valider les données de la requête avec VineJS
    const payload: MatchmakingJoinRequestBody = await request.validateUsing(matchmakingJoinValidator)

    // Générer le ModeKey à partir du payload
    const modeKey: ModeKey = MatchmakingRedisService.makeModeKey(payload.queue_type, payload.team_size)

    // Enqueue le joueur dans la file d'attente Redis
    await MatchmakingRedisService.enqueuePlayer(modeKey, auth.user!.id)

    // Répondre avec un message de succès
    // (202 Accepted indique que la requête a été acceptée pour traitement, mais que le traitement n'est pas encore terminé)
    response.status(202).json({
      message: `Rejoint la file d'attente pour ${modeKey}`,
    })
  }
}
