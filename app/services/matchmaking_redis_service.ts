import redis from '@adonisjs/redis/services/main'

/**
 * Matchmaking Redis (runtime) – Aether Royale
 *
 * Objectif :
 * - Stocker en Redis tout ce qui est "runtime" (matchmaking / remplissage / démarrage)
 * - Garder MariaDB pour l’historique long terme (matches, match_players, stats)
 *
 * Stratégie :
 * - 1 queue d’attente par mode de jeu (LIST)
 * - 1 pool de matchs joinables par mode de jeu (ZSET) → on prend toujours le match le plus rempli
 * - 1 hash par match (HASH) → état runtime + duplication min/max_players pour éviter les reads DB mariadb
 *
 * Clés Redis :
 * - mm:queue:<modeKey>        (LIST) : file d'attente des joueurs (RPUSH/LPOP)
 * - mm:joinable:<modeKey>     (ZSET) : matchs joinables (score = players_count)
 * - mm:match:<matchId>        (HASH) : état runtime du match
 *
 * modeKey :
 * - "<queue_type>:<team_size>"
 * - ex: "unranked:1", "ranked:2"
 *
 * ⚠️ Version volontairement simple :
 * - Pas de locks (donc overshoot rare possible en multi-replica)
 * - Le but est d’avancer "petit à petit" et de solidifier ensuite (locks/Lua).
 */

/**
 *
 */
export type QueueType = 'ranked' | 'unranked'
/**
 *
 */
export type TeamSize = 1 | 2 | 4
/**
 *
 */
export type ModeKey = `${QueueType}:${TeamSize}`

/**
 * Statut runtime du match.
 *
 * joinable   : le match accepte encore des joueurs
 * starting   : le seuil min_players est atteint, on peut déclencher le start (warmup->start)
 * in_progress: la partie a réellement commencé (started_at non-null en DB mariadb plus tard)
 * ended      : match terminé (ou abandonné, crash, etc. – à mapper ensuite sur DB)
 */
export type MatchRuntimeStatus = 'joinable' | 'starting' | 'in_progress' | 'ended'

/**
 *
 */
export type MatchId = number
/**
 *
 */
export type UserId = number

/**
 * Token base64 (16 bytes recommandés) qui sera utilisé par le client
 * pour ajouter un suffixe aux paquets UDP et permettre à Quilkin de router.
 */
export type MatchTokenBase64 = string

/**
 * Clé symétrique base64 utilisée pour chiffrer/déchiffrer le UDP (XChaCha20-Poly1305).
 */
export type UdpEncryptionKeyBase64 = string

/**
 * Payload minimal renvoyé (via WebSocket) au client assigné à un match :
 * - matchId : identifiant DB / runtime
 * - matchTokenBase64 : token Quilkin
 * - udpEncryptionKeyBase64 : clé de chiffrement UDP
 */
export type AssignedMatchPayload = {
  matchId: MatchId
  matchTokenBase64: MatchTokenBase64
  udpEncryptionKeyBase64: UdpEncryptionKeyBase64
}

/**
 * Résultat d'une assignation :
 * - userId : joueur sorti de la queue
 * - assigned : infos de connexion/secure pour ce match
 * - shouldStart : true si players_count >= min_players (donc match "startable")
 * - playersCount/minPlayers/maxPlayers : utile au worker (logs / déclenchement start)
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
 * Paramètres pour créer un match joinable (runtime) dans Redis.
 *
 * Notes :
 * - On duplique min_players / max_players en Redis → aucun read MariaDB requis au runtime.
 * - On garde gameModeId et les infos Agones (observabilité) pour se rapprocher de la table `matches`.
 */
export type AddJoinableMatchParams = {
  matchId: MatchId
  modeKey: ModeKey

  // miroir DB (dupliqué runtime)
  gameModeId: number
  minPlayers: number
  maxPlayers: number

  // sécurité
  matchTokenBase64: MatchTokenBase64
  udpEncryptionKeyBase64: UdpEncryptionKeyBase64

  // observabilité agones (miroir matches)
  agonesGameServerName?: string | null
  agonesNodeName?: string | null

  // optionnel
  playersCount?: number
}

/**
 * Génère la clé Redis de la queue (LIST) pour un mode donné.
 *
 * @param modeKey "<queue_type>:<team_size>"
 * @returns Clé Redis mm:queue:<modeKey>
 */
const keyQueue: (modeKey: ModeKey) => string = (modeKey: ModeKey): string => `mm:queue:${modeKey}`

/**
 * Génère la clé Redis de la pool joinable (ZSET) pour un mode donné.
 *
 * @param modeKey "<queue_type>:<team_size>"
 * @returns Clé Redis mm:joinable:<modeKey>
 */
const keyJoinable: (modeKey: ModeKey) => string = (modeKey: ModeKey): string => `mm:joinable:${modeKey}`

/**
 * Génère la clé Redis du hash runtime d'un match.
 *
 * @param matchId Identifiant du match (DB / runtime)
 * @returns Clé Redis mm:match:<matchId>
 */
const keyMatch: (matchId: MatchId) => string = (matchId: MatchId): string => `mm:match:${matchId}`

/**
 * Clé qui indique dans quelle queue un user est actuellement (1 seul matchmaking actif).
 *
 * mm:user_queue:<userId> = "<modeKey>"
 */
const keyUserQueue: (userId: UserId) => string = (userId: UserId): string => `mm:user_queue:${userId}`

/**
 * TTL pour l'état "en recherche".
 * Si crash / déco / bug client, on nettoie automatiquement.
 *
 * 15 minutes = 900 secondes
 */
const TTL_USER_QUEUE_SECONDS: number = 900

/**
 * TTL appliqué au hash runtime d’un match.
 * Permet de nettoyer automatiquement Redis après la fin.
 *
 * 60 minutes = 3600 secondes
 */
const TTL_MATCH_SECONDS: number = 3600

/**
 * Service de matchmaking runtime basé sur Redis.
 *
 * Responsabilités :
 * - Enqueue d’un joueur dans une queue par mode (LIST)
 * - Gestion de la pool de matchs joinables par mode (ZSET)
 * - Stockage de l’état runtime d’un match (HASH)
 *
 * Optimisation principale :
 * - Toujours assigner un joueur au match joinable le plus plein
 *   → accélère le remplissage et réduit la fragmentation (plein de matchs à moitié vides).
 */
export class MatchmakingRedisService {
  /**
   * Construit un modeKey stable à partir des choix du joueur.
   *
   * Exemple :
   * - queueType="unranked", teamSize=1  => "unranked:1"
   * - queueType="ranked",   teamSize=2  => "ranked:2"
   *
   * @param queueType ranked | unranked
   * @param teamSize  1 | 2 | 4
   * @returns ModeKey "<queue_type>:<team_size>"
   */
  public static makeModeKey(queueType: QueueType, teamSize: TeamSize): ModeKey {
    const modeKey: ModeKey = `${queueType}:${teamSize}`
    return modeKey
  }

  /**
   * Ajoute un joueur dans la queue d’attente (LIST) du mode.
   *
   * Variante "Fortnite-like" :
   * - 1 seul matchmaking actif par user (tous modes confondus)
   * - idempotent : si déjà en recherche, on ne le remet pas 10 fois
   *
   * @returns true si ajouté, false si déjà en recherche
   */
  public static async enqueuePlayer(modeKey: ModeKey, userId: UserId): Promise<boolean> {
    const queueKey: string = keyQueue(modeKey)
    const userIdStr: string = String(userId)

    const userQueueKey: string = keyUserQueue(userId)

    // Bloque le spam + empêche d'être dans plusieurs modes en même temps
    const ok: string | null = await redis.set(userQueueKey, modeKey, 'EX', TTL_USER_QUEUE_SECONDS, 'NX')

    if (ok === null) {
      // Déjà en recherche → on refresh le TTL pour prolonger la session
      await redis.expire(userQueueKey, TTL_USER_QUEUE_SECONDS)
      return false
    }

    await redis.rpush(queueKey, userIdStr)
    return true
  }

  /**
   * Annule la recherche en cours.
   *
   * - Lit le modeKey depuis mm:user_queue:<userId>
   * - LREM pour retirer le userId de la LIST
   * - DEL pour supprimer l'état "en recherche"
   *
   * @returns true si annulé, false si aucune recherche active
   */
  public static async cancelSearch(userId: UserId): Promise<boolean> {
    const userQueueKey: string = keyUserQueue(userId)
    const modeKeyStr: string | null = await redis.get(userQueueKey)

    if (modeKeyStr === null) return false

    const modeKey: ModeKey = modeKeyStr as ModeKey
    const queueKey: string = keyQueue(modeKey)

    // Retire toutes les occurrences (sécurité)
    await redis.lrem(queueKey, 0, String(userId))

    // Supprime l'état "en recherche"
    await redis.del(userQueueKey)

    return true
  }

  /**
   * Ajoute un match joinable dans Redis.
   *
   * Ce que ça fait :
   * 1) Écrit le hash runtime mm:match:<matchId>
   * 2) Ajoute <matchId> dans le ZSET mm:joinable:<modeKey> avec score = players_count
   * 3) Pose un TTL pour nettoyage automatique
   *
   * Pourquoi dupliquer min_players/max_players ici ?
   * - Pour que la boucle matchmaking runtime n’ait pas besoin d’aller lire MariaDB.
   *
   * @param params Données runtime + miroir DB (min/max + gameModeId) + infos Agones
   */
  public static async addJoinableMatch(params: AddJoinableMatchParams): Promise<void> {
    const playersCount: number = params.playersCount ?? 0
    const nowMs: number = Date.now()

    const matchKey: string = keyMatch(params.matchId)
    const joinableKey: string = keyJoinable(params.modeKey)

    const agonesGameServerName: string = params.agonesGameServerName ?? ''
    const agonesNodeName: string = params.agonesNodeName ?? ''

    const matchHash: Record<string, string> = {
      modeKey: params.modeKey,
      status: 'joinable',
      players_count: String(playersCount),

      // miroir DB (dupliqué runtime)
      game_mode_id: String(params.gameModeId),
      min_players: String(params.minPlayers),
      max_players: String(params.maxPlayers),

      // sécurité
      matchTokenBase64: params.matchTokenBase64,
      udpEncryptionKeyBase64: params.udpEncryptionKeyBase64,

      // agones (observabilité)
      agones_gameserver_name: agonesGameServerName,
      agones_node_name: agonesNodeName,

      created_at_ms: String(nowMs),
    }

    await redis.hset(matchKey, matchHash)

    await redis.expire(matchKey, TTL_MATCH_SECONDS)

    // Set to 'starting' if already at or above minPlayers
    if (playersCount >= params.minPlayers) {
      await redis.hset(matchKey, 'status', 'starting')
      await redis.hset(matchKey, 'started_at_ms', String(nowMs))
    }

    // Only add to ZSET if not already full
    if (playersCount < params.maxPlayers) {
      await redis.zadd(joinableKey, playersCount, String(params.matchId))
    }
  }

  /**
   * Pop un joueur de la queue (LIST) et l'assigne au match joinable le plus plein.
   *
   * Algorithme (simple, sans locks) :
   * 1) LPOP mm:queue:<modeKey> => userId
   * 2) ZREVRANGE mm:joinable:<modeKey> 0 0 => matchId le plus rempli
   * 3) Vérifier hash mm:match:<matchId> (status, players_count, min/max, token/key)
   * 4) HINCRBY players_count (+ update score ZSET)
   * 5) Si match plein => ZREM du joinable
   * 6) Si newCount >= min_players => status=starting + started_at_ms
   *
   * Retour :
   * - null si aucun joueur en queue
   * - null si aucun match joinable (et le joueur est re-queue)
   *
   * @param modeKey ModeKey (ex: "unranked:1")
   * @returns PopAssignResult | null
   */
  public static async popAndAssignToMostFullJoinable(modeKey: ModeKey): Promise<PopAssignResult | null> {
    const queueKey: string = keyQueue(modeKey)
    const joinableKey: string = keyJoinable(modeKey)

    // 1) Prendre un joueur
    const userIdStr: string | null = await redis.lpop(queueKey)
    if (userIdStr === null) return null

    const userId: UserId = Number(userIdStr)

    const activeModeKey: string | null = await redis.get(keyUserQueue(userId))
    if (activeModeKey === null) {
      // cancel / TTL expiré => on drop
      return null
    }

    if (activeModeKey !== modeKey) {
      const activeModeKeyStr: 'ranked:4' | 'ranked:1' | 'ranked:2' | 'unranked:4' | 'unranked:1' | 'unranked:2' =
        activeModeKey as ModeKey
      // sécurité: enlever toute trace dans la queue où on l'a pop
      await redis.lrem(queueKey, 0, userIdStr)
      // le remettre dans la queue correspondant à son état actuel
      await redis.rpush(keyQueue(activeModeKeyStr), userIdStr)
      // Refresh TTL "en recherche" (évite expiration si ça dure)
      await redis.expire(keyUserQueue(userId), TTL_USER_QUEUE_SECONDS)
      return null
    }

    // 2) Prendre le match joinable le plus plein
    const best: string[] = await redis.zrevrange(joinableKey, 0, 0)
    if (best.length === 0) {
      // Aucun match joinable => on remet le joueur dans la queue pour retenter plus tard
      await redis.rpush(queueKey, userIdStr)
      // Refresh TTL "en recherche" (évite expiration si ça dure)
      await redis.expire(keyUserQueue(userId), TTL_USER_QUEUE_SECONDS)
      return null
    }

    const matchId: MatchId = Number(best[0])
    const matchKey: string = keyMatch(matchId)

    // 3) Lire l'état runtime du match
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

    // 4) Validation
    if (
      status === null ||
      !(status === 'joinable' || status === 'starting') ||
      playersCountStr === null ||
      minPlayersStr === null ||
      maxPlayersStr === null ||
      matchTokenBase64 === null ||
      udpEncryptionKeyBase64 === null
    ) {
      // Match invalide => on le retire du joinable (évite de le reprendre en boucle)
      // et on remet le joueur en queue.
      await redis.zrem(joinableKey, String(matchId))
      await redis.lrem(queueKey, 0, userIdStr)
      await redis.rpush(queueKey, userIdStr)
      await redis.expire(keyUserQueue(userId), TTL_USER_QUEUE_SECONDS)
      return null
    }

    const playersCount: number = Number(playersCountStr)
    const minPlayers: number = Number(minPlayersStr)
    const maxPlayers: number = Number(maxPlayersStr)

    // Si déjà plein (incohérence possible), on purge et requeue
    if (playersCount >= maxPlayers) {
      await redis.zrem(joinableKey, String(matchId))
      await redis.lrem(queueKey, 0, userIdStr)
      await redis.rpush(queueKey, userIdStr)
      await redis.expire(keyUserQueue(userId), TTL_USER_QUEUE_SECONDS)
      return null
    }

    // 5) Ajouter le joueur au match
    const newCount: number = await redis.hincrby(matchKey, 'players_count', 1)

    // 6/7) Mettre à jour le ZSET uniquement si le match reste joinable
    if (newCount >= maxPlayers) {
      // Match plein => ne doit plus être dans joinable
      await redis.zrem(joinableKey, String(matchId))
    } else {
      // Match encore joinable => on met à jour son score
      await redis.zadd(joinableKey, newCount, String(matchId))
    }

    // 8) Seuil min atteint => match "startable"
    const shouldStart: boolean = newCount >= minPlayers
    if (shouldStart) {
      // Sans locks : plusieurs writes identiques possibles, ce n'est pas grave ici.
      await redis.hset(matchKey, 'status', 'starting')
      await redis.hset(matchKey, 'started_at_ms', String(Date.now()))
    }

    const result: PopAssignResult = {
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

    // Le joueur n'est plus "en recherche" une fois assigné à un match, on peut supprimer la clé de suivi.
    await redis.del(keyUserQueue(userId))

    return result
  }
}
