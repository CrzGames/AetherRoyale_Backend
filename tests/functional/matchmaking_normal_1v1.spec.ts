import { test } from '@japa/runner'
import redis from '@adonisjs/redis/services/main'
import User from '#models/user'
import {
  MatchmakingRedisService,
  NORMAL_1V1_JOINABLE_KEY,
  NORMAL_1V1_MODE_KEY,
  NORMAL_1V1_QUEUE_KEY,
} from '#services/matchmaking_redis_service'

const USER_QUEUE_KEY = (userId: number) => `mm:user_queue:${userId}`
const MATCH_KEY = (matchId: number) => `mm:match:${matchId}`

function uniqueSuffix(): string {
  return `${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`
}

async function createUser(prefix: string): Promise<User> {
  const suffix = uniqueSuffix()
  return User.create({
    email: `${prefix}_${suffix}@test.local`,
    username: `${prefix}_${suffix}`,
    password: 'password',
  })
}

async function flushMatchmakingKeys() {
  await redis.del(NORMAL_1V1_QUEUE_KEY)
  await redis.del(NORMAL_1V1_JOINABLE_KEY)

  const userQueueKeys = await redis.keys('mm:user_queue:*')
  if (userQueueKeys.length) await redis.del(userQueueKeys)

  const matchKeys = await redis.keys('mm:match:*')
  if (matchKeys.length) await redis.del(matchKeys)
}

test.group('Matchmaking (functional) - normal 1v1', (group) => {
  group.setup(async () => {
    await flushMatchmakingKeys()
  })

  group.each.setup(async () => {
    await flushMatchmakingKeys()
  })

  test('POST /matchmaking/join -> 202 + user enqueued', async ({ client, assert }) => {
    const user = await createUser('join')

    const res = await client.post('/matchmaking/join').loginAs(user)

    res.assertStatus(202)
    res.assertBodyContains({ message: 'Rejoint la file d attente normal 1v1' })

    assert.equal(await redis.get(USER_QUEUE_KEY(user.id)), NORMAL_1V1_MODE_KEY)

    const queue = await redis.lrange(NORMAL_1V1_QUEUE_KEY, 0, -1)
    assert.deepEqual(queue, [String(user.id)])
  })

  test('POST /matchmaking/join x2 -> 202 puis 200 + pas de doublon', async ({ client, assert }) => {
    const user = await createUser('join_twice')

    const first = await client.post('/matchmaking/join').loginAs(user)
    first.assertStatus(202)

    const second = await client.post('/matchmaking/join').loginAs(user)
    second.assertStatus(200)
    second.assertBodyContains({ message: 'Deja en recherche d une partie' })

    const queue = await redis.lrange(NORMAL_1V1_QUEUE_KEY, 0, -1)
    const occurrences = queue.filter((id) => id === String(user.id)).length
    assert.equal(occurrences, 1)
  })

  test('POST /matchmaking/cancel -> retire de la queue + supprime user_queue', async ({ client, assert }) => {
    const user = await createUser('cancel')

    await client.post('/matchmaking/join').loginAs(user)

    const cancelRes = await client.post('/matchmaking/cancel').loginAs(user)
    cancelRes.assertStatus(200)
    cancelRes.assertBodyContains({ message: 'Recherche annulee' })

    assert.isNull(await redis.get(USER_QUEUE_KEY(user.id)))

    const queue = await redis.lrange(NORMAL_1V1_QUEUE_KEY, 0, -1)
    assert.isFalse(queue.includes(String(user.id)))
  })

  test('FIFO: 2 users en queue -> assignation dans l ordre', async ({ client, assert }) => {
    const u1 = await createUser('fifo1')
    const u2 = await createUser('fifo2')

    await client.post('/matchmaking/join').loginAs(u1)
    await client.post('/matchmaking/join').loginAs(u2)

    const matchId = 1001
    await MatchmakingRedisService.addJoinableMatch({
      matchId,
      matchTokenBase64: 'dG9rZW5fMQ==',
      udpEncryptionKeyBase64: 'a2V5XzE=',
      playersCount: 0,
    })

    const r1 = await MatchmakingRedisService.popAndAssignToMostFullJoinable()
    const r2 = await MatchmakingRedisService.popAndAssignToMostFullJoinable()
    const r3 = await MatchmakingRedisService.popAndAssignToMostFullJoinable()

    assert.isNotNull(r1)
    assert.isNotNull(r2)
    assert.isNull(r3)

    assert.equal(r1!.userId, u1.id)
    assert.equal(r2!.userId, u2.id)
    assert.equal(r1!.assigned.matchId, matchId)
    assert.equal(r2!.assigned.matchId, matchId)

    assert.equal(Number(await redis.hget(MATCH_KEY(matchId), 'players_count')), 2)
    assert.equal(await redis.hget(MATCH_KEY(matchId), 'status'), 'starting')

    const joinables = await redis.zrange(NORMAL_1V1_JOINABLE_KEY, 0, -1)
    assert.isFalse(joinables.includes(String(matchId)))

    assert.isNull(await redis.get(USER_QUEUE_KEY(u1.id)))
    assert.isNull(await redis.get(USER_QUEUE_KEY(u2.id)))
  })

  test('Most-full: remplit en priorite le match deja le plus rempli', async ({ assert }) => {
    const u1 = await createUser('mostfull1')
    const u2 = await createUser('mostfull2')

    await MatchmakingRedisService.enqueuePlayer(u1.id)
    await MatchmakingRedisService.enqueuePlayer(u2.id)

    const matchA = 2001
    const matchB = 2002

    await MatchmakingRedisService.addJoinableMatch({
      matchId: matchA,
      matchTokenBase64: 'dG9rZW5fQQ==',
      udpEncryptionKeyBase64: 'a2V5X0E=',
      playersCount: 1,
    })

    await MatchmakingRedisService.addJoinableMatch({
      matchId: matchB,
      matchTokenBase64: 'dG9rZW5fQg==',
      udpEncryptionKeyBase64: 'a2V5X0I=',
      playersCount: 0,
    })

    const r1 = await MatchmakingRedisService.popAndAssignToMostFullJoinable()
    assert.isNotNull(r1)
    assert.equal(r1!.assigned.matchId, matchA)

    const r2 = await MatchmakingRedisService.popAndAssignToMostFullJoinable()
    assert.isNotNull(r2)
    assert.equal(r2!.assigned.matchId, matchB)
  })

  test('Aucun match joinable -> le joueur est remis en queue', async ({ assert }) => {
    const user = await createUser('requeue')

    await MatchmakingRedisService.enqueuePlayer(user.id)

    const result = await MatchmakingRedisService.popAndAssignToMostFullJoinable()
    assert.isNull(result)

    const queue = await redis.lrange(NORMAL_1V1_QUEUE_KEY, 0, -1)
    assert.deepEqual(queue, [String(user.id)])
    assert.equal(await redis.get(USER_QUEUE_KEY(user.id)), NORMAL_1V1_MODE_KEY)
  })

  test('Match cree deja plein -> non joinable + status starting', async ({ assert }) => {
    const matchId = 3001

    await MatchmakingRedisService.addJoinableMatch({
      matchId,
      matchTokenBase64: 'dG9rZW5fZnVsbA==',
      udpEncryptionKeyBase64: 'a2V5X2Z1bGw=',
      playersCount: 2,
    })

    const joinables = await redis.zrange(NORMAL_1V1_JOINABLE_KEY, 0, -1)
    assert.isFalse(joinables.includes(String(matchId)))
    assert.equal(await redis.hget(MATCH_KEY(matchId), 'status'), 'starting')
    assert.equal(Number(await redis.hget(MATCH_KEY(matchId), 'players_count')), 2)
  })

  test('Pop sur match invalide -> purge du ZSET + requeue du joueur', async ({ assert }) => {
    const matchId = 4001
    await redis.hset(MATCH_KEY(matchId), {
      players_count: '1',
      min_players: '2',
      max_players: '2',
      matchTokenBase64: 'tok',
      udpEncryptionKeyBase64: 'key',
    })
    await redis.zadd(NORMAL_1V1_JOINABLE_KEY, 1, String(matchId))

    const user = await createUser('invalid_match')
    await MatchmakingRedisService.enqueuePlayer(user.id)

    const result = await MatchmakingRedisService.popAndAssignToMostFullJoinable()
    assert.isNull(result)

    assert.isNull(await redis.zscore(NORMAL_1V1_JOINABLE_KEY, String(matchId)))

    const queue = await redis.lrange(NORMAL_1V1_QUEUE_KEY, 0, -1)
    assert.include(queue, String(user.id))
  })
})
