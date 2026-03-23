import { MatchmakingRedisService } from '#services/matchmaking_redis_service'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Controller de gestion du matchmaking.
 *
 * Regle produit actuelle:
 * - une seule file de matchmaking
 * - un seul format: normal 1v1
 * - aucun choix ranked/unranked/team_size cote client
 */
export default class MatchmakingController {
  /**
   * @MatchmakingJoin
   * @operationId matchmakingJoin
   * @tag Matchmaking
   * @summary Rejoindre la file d'attente normal 1v1
   * @description Lance une recherche de match en file unique 1v1.
   * @responseBody 202 - <SuccessResponseBody> - Joueur ajoute a la file
   * @responseBody 200 - <SuccessResponseBody> - Joueur deja en recherche
   * @responseBody 500 - <ErrorResponseBody> - Erreur interne
   */
  public async matchmakingJoin({ response, auth }: HttpContext): Promise<void> {
    // Idempotent: false si le joueur etait deja en recherche.
    const added: boolean = await MatchmakingRedisService.enqueuePlayer(auth.user!.id)

    if (!added) {
      response.status(200).json({ message: 'Deja en recherche d une partie' })
      return
    }

    response.status(202).json({ message: 'Rejoint la file d attente normal 1v1' })
  }

  /**
   * @MatchmakingCancel
   * @operationId matchmakingCancel
   * @tag Matchmaking
   * @summary Annuler la recherche de match
   * @description Retire le joueur de la file de matchmaking si une recherche est active.
   * @responseBody 200 - <SuccessResponseBody> - Recherche annulee ou aucune recherche active
   * @responseBody 500 - <ErrorResponseBody> - Erreur interne
   */
  public async matchmakingCancel({ response, auth }: HttpContext): Promise<void> {
    const cancelled: boolean = await MatchmakingRedisService.cancelSearch(auth.user!.id)

    response.status(200).json({
      message: cancelled ? 'Recherche annulee' : 'Pas de recherche active',
    })
  }
}
