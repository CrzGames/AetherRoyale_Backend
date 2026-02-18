import { test } from '@japa/runner'
import redis from '@adonisjs/redis/services/main'
import User from '#models/user'
import { MatchmakingRedisService } from '#services/matchmaking_redis_service'

/**
 * On se limite à unranked + solo pour ces tests.
 */
const MODE_KEY = 'unranked:1'
const QUEUE_KEY = `mm:queue:${MODE_KEY}`
const JOINABLE_KEY = `mm:joinable:${MODE_KEY}`
const USER_QUEUE_KEY = (userId: number) => `mm:user_queue:${userId}`
const MATCH_KEY = (matchId: number) => `mm:match:${matchId}`
const keyUserQueue = (userId: number) => `mm:user_queue:${userId}`

/**
 * Nettoyage complet avant/après les tests
 */
async function flushMatchmakingKeys() {
  await redis.del(QUEUE_KEY)
  await redis.del(JOINABLE_KEY)

  const userQueueKeys = await redis.keys('mm:user_queue:*')
  if (userQueueKeys.length) await redis.del(userQueueKeys)

  const matchKeys = await redis.keys('mm:match:*')
  if (matchKeys.length) await redis.del(matchKeys)
}

test.group('Matchmaking (functional) - unranked solo', (group) => {
  group.setup(async () => {
    await flushMatchmakingKeys()
  })

  group.each.setup(async () => {
    await flushMatchmakingKeys()
  })

  // ────────────────────────────────────────────────
  // Tests de base (API + queue)
  // ────────────────────────────────────────────────

  test('POST /matchmaking/join → 202 + utilisateur ajouté en queue + user_queue settée', async ({ client, assert }) => {
    const user = await User.create({
      email: `u_${Date.now()}@test.local`,
      username: `u_${Date.now()}`,
      password: 'password',
    })

    const res = await client
      .post('/matchmaking/join')
      .json({ queue_type: 'unranked', team_size: 1 })
      .loginAs(user)

    res.assertStatus(202)
    res.assertBodyContains({ message: `Rejoint la file d'attente pour ${MODE_KEY}` })

    assert.equal(await redis.get(USER_QUEUE_KEY(user.id)), MODE_KEY)

    const queue = await redis.lrange(QUEUE_KEY, 0, -1)
    assert.deepEqual(queue, [String(user.id)])
  })

  test('POST /matchmaking/join ×2 → 202 puis 200 + pas de doublon dans la liste', async ({ client, assert }) => {
    const user = await User.create({
      email: `u_${Date.now()}@test.local`,
      username: `u_${Date.now()}`,
      password: 'password',
    })

    const res1 = await client
      .post('/matchmaking/join')
      .json({ queue_type: 'unranked', team_size: 1 })
      .loginAs(user)
    res1.assertStatus(202)

    const res2 = await client
      .post('/matchmaking/join')
      .json({ queue_type: 'unranked', team_size: 1 })
      .loginAs(user)
    res2.assertStatus(200)
    res2.assertBodyContains({ message: 'Déjà en recherche d’une partie' })

    const queue = await redis.lrange(QUEUE_KEY, 0, -1)
    const occurrences = queue.filter((id) => id === String(user.id)).length
    assert.equal(occurrences, 1, 'Pas de doublon dans la queue')
  })

  test('POST /matchmaking/cancel → retire de la queue + supprime user_queue', async ({ client, assert }) => {
    const user = await User.create({
      email: `u_${Date.now()}@test.local`,
      username: `u_${Date.now()}`,
      password: 'password',
    })

    await client
      .post('/matchmaking/join')
      .json({ queue_type: 'unranked', team_size: 1 })
      .loginAs(user)

    const cancelRes = await client.post('/matchmaking/cancel').loginAs(user)
    cancelRes.assertStatus(200)
    cancelRes.assertBodyContains({ message: 'Recherche annulée' })

    assert.isNull(await redis.get(USER_QUEUE_KEY(user.id)))

    const queue = await redis.lrange(QUEUE_KEY, 0, -1)
    assert.isFalse(queue.includes(String(user.id)))
  })

  // ────────────────────────────────────────────────
  // Tests de logique matchmaking (pop & assign)
  // ────────────────────────────────────────────────

  test('FIFO : 3 users en queue → popAndAssign respecte l’ordre (FIFO)', async ({ client, assert }) => {
    const u1 = await User.create({ email: `u1_${Date.now()}@test.local`, username: `u1_${Date.now()}`, password: 'password' })
    const u2 = await User.create({ email: `u2_${Date.now()}@test.local`, username: `u2_${Date.now()}`, password: 'password' })
    const u3 = await User.create({ email: `u3_${Date.now()}@test.local`, username: `u3_${Date.now()}`, password: 'password' })

    await client.post('/matchmaking/join').json({ queue_type: 'unranked', team_size: 1 }).loginAs(u1)
    await client.post('/matchmaking/join').json({ queue_type: 'unranked', team_size: 1 }).loginAs(u2)
    await client.post('/matchmaking/join').json({ queue_type: 'unranked', team_size: 1 }).loginAs(u3)

    const matchId = 1001
    await MatchmakingRedisService.addJoinableMatch({
      matchId,
      modeKey: MODE_KEY,
      gameModeId: 1,
      minPlayers: 2,
      maxPlayers: 4,
      matchTokenBase64: 'dG9rZW4xMjM0NTY3ODkwMTIzNA==',
      udpEncryptionKeyBase64: 'a2V5MTIzNDU2Nzg5MDEyMzQ1Ng==',
      playersCount: 1,
    })

    const queue = await redis.lrange(QUEUE_KEY, 0, -1)
    assert.deepEqual(queue, [String(u1.id), String(u2.id), String(u3.id)])

    const r1 = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)
    const r2 = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)
    const r3 = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)

    assert.isNotNull(r1)
    assert.isNotNull(r2)
    assert.isNotNull(r3)

    assert.equal(r1!.userId, u1.id)
    assert.equal(r2!.userId, u2.id)
    assert.equal(r3!.userId, u3.id)

    assert.isNull(await redis.get(USER_QUEUE_KEY(u1.id)))
    assert.isNull(await redis.get(USER_QUEUE_KEY(u2.id)))
    assert.isNull(await redis.get(USER_QUEUE_KEY(u3.id)))
  })

  test('Most-full : assigne toujours au match le plus rempli (ZSET score)', async ({ client, assert }) => {
    const u1 = await User.create({ email: `u1_${Date.now()}@test.local`, username: `u1_${Date.now()}`, password: 'password' })
    const u2 = await User.create({ email: `u2_${Date.now()}@test.local`, username: `u2_${Date.now()}`, password: 'password' })

    await client.post('/matchmaking/join').json({ queue_type: 'unranked', team_size: 1 }).loginAs(u1)
    await client.post('/matchmaking/join').json({ queue_type: 'unranked', team_size: 1 }).loginAs(u2)

    const matchA = 2001
    const matchB = 2002

    await MatchmakingRedisService.addJoinableMatch({
      matchId: matchA,
      modeKey: MODE_KEY,
      gameModeId: 1,
      minPlayers: 2,
      maxPlayers: 10,
      matchTokenBase64: 'dG9rZW5B',
      udpEncryptionKeyBase64: 'a2V5QQ==',
      playersCount: 3,
    })

    await MatchmakingRedisService.addJoinableMatch({
      matchId: matchB,
      modeKey: MODE_KEY,
      gameModeId: 1,
      minPlayers: 2,
      maxPlayers: 10,
      matchTokenBase64: 'dG9rZW5C',
      udpEncryptionKeyBase64: 'a2V5Qg==',
      playersCount: 1,
    })

    const r1 = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)
    assert.isNotNull(r1)
    assert.equal(r1!.assigned.matchId, matchA)

    const countA = await redis.hget(MATCH_KEY(matchA), 'players_count')
    assert.equal(Number(countA), 4)

    const r2 = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)
    assert.isNotNull(r2)
    assert.equal(r2!.assigned.matchId, matchA)

    const countA2 = await redis.hget(MATCH_KEY(matchA), 'players_count')
    assert.equal(Number(countA2), 5)
  })

  test('Cancel pendant la queue → utilisateur annulé n’est jamais assigné', async ({ client, assert }) => {
    const u1 = await User.create({ email: `u1_${Date.now()}@test.local`, username: `u1_${Date.now()}`, password: 'password' })
    const u2 = await User.create({ email: `u2_${Date.now()}@test.local`, username: `u2_${Date.now()}`, password: 'password' })
    const u3 = await User.create({ email: `u3_${Date.now()}@test.local`, username: `u3_${Date.now()}`, password: 'password' })

    await client.post('/matchmaking/join').json({ queue_type: 'unranked', team_size: 1 }).loginAs(u1)
    await client.post('/matchmaking/join').json({ queue_type: 'unranked', team_size: 1 }).loginAs(u2)
    await client.post('/matchmaking/join').json({ queue_type: 'unranked', team_size: 1 }).loginAs(u3)

    await client.post('/matchmaking/cancel').loginAs(u2)

    const matchId = 3001
    await MatchmakingRedisService.addJoinableMatch({
      matchId,
      modeKey: MODE_KEY,
      gameModeId: 1,
      minPlayers: 2,
      maxPlayers: 10,
      matchTokenBase64: 'dG9rZW4=',
      udpEncryptionKeyBase64: 'a2V5',
      playersCount: 0,
    })

    const r1 = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)
    const r2 = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)
    const r3 = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)

    const assignedIds = [r1, r2, r3]
      .filter((r): r is NonNullable<typeof r> => r !== null)
      .map((r) => r.userId)

    assert.deepEqual(assignedIds.sort(), [u1.id, u3.id].sort())
    assert.isFalse(assignedIds.includes(u2.id))
  })

  // ────────────────────────────────────────────────
  // Tests de robustesse / cas limites
  // ────────────────────────────────────────────────

  test('Match créé déjà plein → ne doit PAS entrer dans le ZSET joinable', async ({ assert }) => {
    const matchId = 9999
    await MatchmakingRedisService.addJoinableMatch({
      matchId,
      modeKey: MODE_KEY,
      gameModeId: 1,
      minPlayers: 2,
      maxPlayers: 4,
      matchTokenBase64: 'dG9rZW4=',
      udpEncryptionKeyBase64: 'a2V5',
      playersCount: 4,
    })

    const joinables = await redis.zrange(JOINABLE_KEY, 0, -1)
    assert.isFalse(joinables.includes(String(matchId)), "Match plein ne doit pas être dans le ZSET")

    const status = await redis.hget(MATCH_KEY(matchId), 'status')
    assert.equal(status, 'starting', "Match déjà au-dessus du min → starting dès la création")
  })

  test('Match créé avec playersCount >= minPlayers → passe directement en starting', async ({ assert }) => {
    const matchId = 8888
    await MatchmakingRedisService.addJoinableMatch({
      matchId,
      modeKey: MODE_KEY,
      gameModeId: 1,
      minPlayers: 2,
      maxPlayers: 6,
      matchTokenBase64: 'dG9rZW4=',
      udpEncryptionKeyBase64: 'a2V5',
      playersCount: 3,
    })

    assert.equal(await redis.hget(MATCH_KEY(matchId), 'status'), 'starting')
    assert.isNotNull(await redis.hget(MATCH_KEY(matchId), 'started_at_ms'))
  })

  test('Assignations successives → match retiré du ZSET quand plein', async ({ assert }) => {
    const matchId = 7777
    await MatchmakingRedisService.addJoinableMatch({
      matchId,
      modeKey: MODE_KEY,
      gameModeId: 1,
      minPlayers: 2,
      maxPlayers: 5,
      matchTokenBase64: 'dG9rZW4=',
      udpEncryptionKeyBase64: 'a2V5',
      playersCount: 2,
    })

    const users = await Promise.all(
      [1, 2, 3].map(async (i) =>
        User.create({
          email: `u${i}_${Date.now()}@test.local`,
          username: `u${i}_${Date.now()}`,
          password: 'password',
        })
      )
    )

    for (const u of users) {
      await MatchmakingRedisService.enqueuePlayer(MODE_KEY, u.id)
    }

    for (let i = 0; i < 3; i++) {
      const res = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)
      assert.isNotNull(res)
      assert.equal(res!.assigned.matchId, matchId)
    }

    const joinables = await redis.zrange(JOINABLE_KEY, 0, -1)
    assert.isFalse(joinables.includes(String(matchId)))

    assert.equal(Number(await redis.hget(MATCH_KEY(matchId), 'players_count')), 5)
  })

  test('Match en starting mais pas plein → continue d’accepter des assignations', async ({ assert }) => {
    const matchId = 6666
    await MatchmakingRedisService.addJoinableMatch({
      matchId,
      modeKey: MODE_KEY,
      gameModeId: 1,
      minPlayers: 2,
      maxPlayers: 5,
      matchTokenBase64: 'dG9rZW4=',
      udpEncryptionKeyBase64: 'a2V5',
      playersCount: 2,
    })

    assert.equal(await redis.hget(MATCH_KEY(matchId), 'status'), 'starting')

    // On simule 2 assignations avec des faux users (mais IDs numériques !)
    const fakeUserIds = [-1001, -1002]

    for (const fakeId of fakeUserIds) {
      await redis.rpush(QUEUE_KEY, String(fakeId))
      await redis.set(keyUserQueue(fakeId), MODE_KEY, 'EX', 60)

      const res = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)
      assert.isNotNull(res, `Assignation pour fake user ${fakeId} devrait réussir`)
      assert.equal(res!.assigned.matchId, matchId)
      assert.isTrue(res!.shouldStart)
    }

    const finalCount = Number(await redis.hget(MATCH_KEY(matchId), 'players_count'))
    assert.equal(finalCount, 4, 'Doit avoir reçu 2 joueurs supplémentaires')
  })

  test('Pop sur match invalide (manque status) → purge du ZSET + requeue du joueur', async ({ assert }) => {
    const matchId = 5555
    await redis.hset(MATCH_KEY(matchId), {
      players_count: '3',
      min_players: '2',
      max_players: '6',
      matchTokenBase64: 'tok',
      udpEncryptionKeyBase64: 'key',
    })
    await redis.zadd(JOINABLE_KEY, 3, String(matchId))

    const user = await User.create({
      email: `bad_${Date.now()}@test.local`,
      username: `bad_${Date.now()}`,
      password: 'pw',
    })
    await MatchmakingRedisService.enqueuePlayer(MODE_KEY, user.id)

    const result = await MatchmakingRedisService.popAndAssignToMostFullJoinable(MODE_KEY)
    assert.isNull(result)

    assert.isNull(await redis.zscore(JOINABLE_KEY, String(matchId)))

    const queue = await redis.lrange(QUEUE_KEY, 0, -1)
    assert.include(queue, String(user.id))
  })
})