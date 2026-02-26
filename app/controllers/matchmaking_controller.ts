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

    // Ajouter le joueur à la file d'attente Redis
    const added: boolean = await MatchmakingRedisService.enqueuePlayer(modeKey, auth.user!.id)

    // Si le joueur était déjà en recherche pour ce mode, on retourne un message d'info
    if (!added) {
      response.status(200).json({ message: 'Déjà en recherche d’une partie' })
      return
    }

    // Sinon, on confirme que le joueur a été ajouté à la file d'attente
    response.status(202).json({ message: `Rejoint la file d'attente pour ${modeKey}` })
  }

  /**
   * @MatchmakingCancel
   * @operationId matchmakingCancel
   * @tag Matchmaking
   * @summary Annuler la recherche de partie de matchmaking
   * @description Gère les requêtes d'annulation de la recherche de partie de matchmaking
   * @responseBody 200 - <SuccessResponseBody> - Annule la recherche de partie de matchmaking
   * @responseBody 500 - <ErrorResponseBody> - Erreur interne du serveur
   */
  public async matchmakingCancel({ response, auth }: HttpContext): Promise<void> {
    // Annuler la recherche de partie du joueur dans Redis
    const cancelled: boolean = await MatchmakingRedisService.cancelSearch(auth.user!.id)

    // Répondre avec un message de succès ou d'info
    response.status(200).json({
      message: cancelled ? 'Recherche annulée' : 'Pas de recherche active',
    })
  }
}
