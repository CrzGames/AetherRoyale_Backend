/**
 * Interfaces pour les corps de requête de matchmaking join
 * @interface
 * @property {('ranked'|'unranked')} queue_type - Le type de file d'attente (classé ou non classé)
 * @property {(1|2|4)} team_size - La taille de l'équipe (1 pour solo, 2 pour duo, 4 pour squad)
 */
export interface MatchmakingJoinRequestBody {
  queue_type: 'ranked' | 'unranked'
  team_size: 1 | 2 | 4
}
