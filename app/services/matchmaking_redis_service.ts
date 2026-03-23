import redis from '@adonisjs/redis/services/main'

/**
 * Matchmaking Redis (runtime) - Aether Royale
 *
 * Decision produit actuelle:
 * - une seule file de matchmaking
 * - un seul format de partie: normal_1v1
 * - pas de ranked/unranked, pas de team_size cote API
 *
 * Rappel architecture:
 * - Redis: etat runtime (queue, assignation, start)
 * - MariaDB: historique long terme (matches, match_players)
 */

/**
 * Cle logique du mode runtime unique.
 */
export const NORMAL_1V1_MODE_KEY: string = 'normal_1v1' as const

/**
 * LIST Redis contenant la file d'attente des joueurs en recherche.
 *
 * Operations principales:
 * - RPUSH userId
 * - LPOP userId
 */
export const NORMAL_1V1_QUEUE_KEY: string = `mm:queue:${NORMAL_1V1_MODE_KEY}`

/**
 * ZSET Redis contenant les matchs "joinable" (non pleins).
 *
 * score = players_count
 * On pioche toujours le match le plus rempli (ZREVRANGE 0 0)
 * pour limiter la fragmentation.
 */
export const NORMAL_1V1_JOINABLE_KEY: string = `mm:joinable:${NORMAL_1V1_MODE_KEY}`

/**
 * Contraintes hard 1v1.
 */
const NORMAL_1V1_MIN_PLAYERS: number = 2
const NORMAL_1V1_MAX_PLAYERS: number = 2

/**
 * Type helper derive de la constante mode.
 */
export type ModeKey = typeof NORMAL_1V1_MODE_KEY

/**
 * Statut runtime d'un match.
 *
 * joinable   : des places sont encore disponibles
 * starting   : le seuil min_players est atteint
 * in_progress: extension future (quand start confirme cote gameserver)
 * ended      : extension future (fin runtime)
 */
export type MatchRuntimeStatus = 'joinable' | 'starting' | 'in_progress' | 'ended'

/**
 * Alias de lisibilite.
 */
export type MatchId = number
/**
 *
 */
export type UserId = number
/**
 *
 */
export type MatchTokenBase64 = string
/**
 *
 */
export type UdpEncryptionKeyBase64 = string

/**
 * Donnees renvoyees au joueur assigne.
 */
export type AssignedMatchPayload = {
  matchId: MatchId
  matchTokenBase64: MatchTokenBase64
  udpEncryptionKeyBase64: UdpEncryptionKeyBase64
}

/**
 * Resultat d'une operation de pop + assign.
 */
export type PopAssignResult = {
  userId: UserId
  assigned: AssignedMatchPayload
  shouldStart: boolean
  playersCount: number
  minPlayers: number
  maxPlayers: number
}

/**
 * Parametres necessaires pour creer un match joinable en runtime.
 */
export type AddJoinableMatchParams = {
  matchId: MatchId
  matchTokenBase64: MatchTokenBase64
  udpEncryptionKeyBase64: UdpEncryptionKeyBase64
  agonesGameServerName?: string | null
  agonesNodeName?: string | null
  playersCount?: number
}

/**
 * Cle HASH runtime du match.
 */
const keyMatch: (matchId: MatchId) => string = (matchId: MatchId): string => `mm:match:${matchId}`

/**
 * Cle de suivi de recherche active par joueur.
 *
 * mm:user_queue:<userId> = "normal_1v1"
 */
const keyUserQueue: (userId: UserId) => string = (userId: UserId): string => `mm:user_queue:${userId}`

/**
 * TTL de l'etat "en recherche".
 *
 * Si le client plante/deco sans cancel explicite,
 * la cle expire et l'etat se nettoie tout seul.
 */
const TTL_USER_QUEUE_SECONDS: number = 900

/**
 * TTL du hash runtime d'un match.
 */
const TTL_MATCH_SECONDS: number = 3600

/**
 * Normalise playersCount pour rester dans [0..2].
 */
function clampPlayersCount(playersCount: number): number {
  if (playersCount < 0) return 0
  if (playersCount > NORMAL_1V1_MAX_PLAYERS) return NORMAL_1V1_MAX_PLAYERS
  return playersCount
}

/**
 * Indique si un match reste joignable apres mise a jour.
 */
function shouldKeepJoinable(playersCount: number): boolean {
  return playersCount < NORMAL_1V1_MAX_PLAYERS
}

/**
 * Service runtime de matchmaking base Redis.
 */
export class MatchmakingRedisService {
  /**
   * Expose la cle mode unique (utile pour logs/tests).
   */
  public static modeKey(): ModeKey {
    return NORMAL_1V1_MODE_KEY
  }

  /**
   * Ajoute un joueur en file d'attente 1v1.
   *
   * Proprietes:
   * - idempotent (si deja en recherche -> false)
   * - un seul matchmaking actif par joueur
   */
  public static async enqueuePlayer(userId: UserId): Promise<boolean> {
    const userIdStr: string = String(userId)
    const userQueueKey: string = keyUserQueue(userId)

    // NX garantit qu'on n'ecrase pas un etat deja actif.
    const ok: string | null = await redis.set(userQueueKey, NORMAL_1V1_MODE_KEY, 'EX', TTL_USER_QUEUE_SECONDS, 'NX')

    if (ok === null) {
      // Deja en recherche -> on prolonge juste la session active.
      await redis.expire(userQueueKey, TTL_USER_QUEUE_SECONDS)
      return false
    }

    // Nettoyage defensif d'eventuels residus de queue avant push.
    await redis.lrem(NORMAL_1V1_QUEUE_KEY, 0, userIdStr)
    await redis.rpush(NORMAL_1V1_QUEUE_KEY, userIdStr)

    return true
  }

  /**
   * Annule la recherche active d'un joueur.
   */
  public static async cancelSearch(userId: UserId): Promise<boolean> {
    const userQueueKey: string = keyUserQueue(userId)
    const state: string | null = await redis.get(userQueueKey)

    if (state === null) return false

    // Retire toutes les occurrences par securite.
    await redis.lrem(NORMAL_1V1_QUEUE_KEY, 0, String(userId))
    await redis.del(userQueueKey)

    return true
  }

  /**
   * Cree/rafraichit un match joinable dans Redis.
   *
   * Ce que la methode fait:
   * 1) Ecrit le HASH mm:match:<matchId>
   * 2) Ajoute/retire le match du ZSET joinable selon players_count
   * 3) Pose un TTL sur le HASH
   */
  public static async addJoinableMatch(params: AddJoinableMatchParams): Promise<void> {
    const playersCount: number = clampPlayersCount(params.playersCount ?? 0)
    const nowMs: number = Date.now()

    const matchKey: string = keyMatch(params.matchId)

    const matchHash: Record<string, string> = {
      modeKey: NORMAL_1V1_MODE_KEY,
      status: playersCount >= NORMAL_1V1_MIN_PLAYERS ? 'starting' : 'joinable',
      players_count: String(playersCount),
      min_players: String(NORMAL_1V1_MIN_PLAYERS),
      max_players: String(NORMAL_1V1_MAX_PLAYERS),
      matchTokenBase64: params.matchTokenBase64,
      udpEncryptionKeyBase64: params.udpEncryptionKeyBase64,
      agones_gameserver_name: params.agonesGameServerName ?? '',
      agones_node_name: params.agonesNodeName ?? '',
      created_at_ms: String(nowMs),
    }

    await redis.hset(matchKey, matchHash)
    await redis.expire(matchKey, TTL_MATCH_SECONDS)

    if (playersCount >= NORMAL_1V1_MIN_PLAYERS) {
      await redis.hset(matchKey, 'started_at_ms', String(nowMs))
    }

    if (shouldKeepJoinable(playersCount)) {
      await redis.zadd(NORMAL_1V1_JOINABLE_KEY, playersCount, String(params.matchId))
    } else {
      await redis.zrem(NORMAL_1V1_JOINABLE_KEY, String(params.matchId))
    }
  }

  /**
   * Pop un joueur de la queue et l'assigne au match joinable le plus rempli.
   *
   * Algorithme (version simple, sans lock distribue):
   * 1) LPOP queue
   * 2) verification etat user_queue
   * 3) ZREVRANGE 0 0 sur joinable
   * 4) validation du HASH match
   * 5) HINCRBY players_count
   * 6) mise a jour/purge du ZSET
   * 7) suppression user_queue (joueur n'est plus en recherche)
   */
  public static async popAndAssignToMostFullJoinable(): Promise<PopAssignResult | null> {
    const userIdStr: string | null = await redis.lpop(NORMAL_1V1_QUEUE_KEY)
    if (userIdStr === null) return null

    const userId: UserId = Number(userIdStr)
    if (Number.isNaN(userId)) return null

    const userQueueKey: string = keyUserQueue(userId)
    const activeModeKey: string | null = await redis.get(userQueueKey)

    // Joueur annule ou TTL expire entre-temps.
    if (activeModeKey === null) {
      return null
    }

    // Securite legacy: on force le mode unique et on requeue.
    if (activeModeKey !== NORMAL_1V1_MODE_KEY) {
      await redis.set(userQueueKey, NORMAL_1V1_MODE_KEY, 'EX', TTL_USER_QUEUE_SECONDS)
      await redis.rpush(NORMAL_1V1_QUEUE_KEY, userIdStr)
      return null
    }

    const best: string[] = await redis.zrevrange(NORMAL_1V1_JOINABLE_KEY, 0, 0)
    if (best.length === 0) {
      // Aucun match disponible pour le moment -> on remet le joueur en queue.
      await redis.rpush(NORMAL_1V1_QUEUE_KEY, userIdStr)
      await redis.expire(userQueueKey, TTL_USER_QUEUE_SECONDS)
      return null
    }

    const matchId: MatchId = Number(best[0])
    const matchKey: string = keyMatch(matchId)

    const fields: Array<string | null> = await redis.hmget(
      matchKey,
      'status',
      'players_count',
      'min_players',
      'max_players',
      'matchTokenBase64',
      'udpEncryptionKeyBase64',
    )

    const status: MatchRuntimeStatus | null = fields[0] as MatchRuntimeStatus | null
    const playersCountStr: string | null = fields[1]
    const minPlayersStr: string | null = fields[2]
    const maxPlayersStr: string | null = fields[3]
    const matchTokenBase64: string | null = fields[4]
    const udpEncryptionKeyBase64: string | null = fields[5]

    // Donnees incoherentes -> on purge le match du ZSET + on requeue le joueur.
    if (
      status === null ||
      !(status === 'joinable' || status === 'starting') ||
      playersCountStr === null ||
      minPlayersStr === null ||
      maxPlayersStr === null ||
      matchTokenBase64 === null ||
      udpEncryptionKeyBase64 === null
    ) {
      await redis.zrem(NORMAL_1V1_JOINABLE_KEY, String(matchId))
      await redis.rpush(NORMAL_1V1_QUEUE_KEY, userIdStr)
      await redis.expire(userQueueKey, TTL_USER_QUEUE_SECONDS)
      return null
    }

    const playersCount: number = Number(playersCountStr)
    const minPlayers: number = Number(minPlayersStr)
    const maxPlayers: number = Number(maxPlayersStr)

    if (!Number.isFinite(playersCount) || !Number.isFinite(minPlayers) || !Number.isFinite(maxPlayers)) {
      await redis.zrem(NORMAL_1V1_JOINABLE_KEY, String(matchId))
      await redis.rpush(NORMAL_1V1_QUEUE_KEY, userIdStr)
      await redis.expire(userQueueKey, TTL_USER_QUEUE_SECONDS)
      return null
    }

    // Si deja plein (cas edge/concurrence), purge puis requeue.
    if (playersCount >= maxPlayers) {
      await redis.zrem(NORMAL_1V1_JOINABLE_KEY, String(matchId))
      await redis.rpush(NORMAL_1V1_QUEUE_KEY, userIdStr)
      await redis.expire(userQueueKey, TTL_USER_QUEUE_SECONDS)
      return null
    }

    const newCount: number = await redis.hincrby(matchKey, 'players_count', 1)

    if (newCount >= maxPlayers) {
      await redis.zrem(NORMAL_1V1_JOINABLE_KEY, String(matchId))
    } else {
      await redis.zadd(NORMAL_1V1_JOINABLE_KEY, newCount, String(matchId))
    }

    const shouldStart: boolean = newCount >= minPlayers
    if (shouldStart) {
      await redis.hset(matchKey, 'status', 'starting')
      await redis.hset(matchKey, 'started_at_ms', String(Date.now()))
    }

    // Le joueur a ete assigne, il ne doit plus etre considere "en recherche".
    await redis.del(userQueueKey)

    return {
      userId,
      assigned: {
        matchId,
        matchTokenBase64,
        udpEncryptionKeyBase64,
      },
      shouldStart,
      playersCount: newCount,
      minPlayers,
      maxPlayers,
    }
  }
}
