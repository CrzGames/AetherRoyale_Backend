import vine from '@vinejs/vine'

/**
 * Sign in validator
 * @type {Object}
 */
export const matchmakingJoinValidator = vine.create({
  queue_type: vine.enum(['ranked', 'unranked']),
  team_size: vine.enum([1, 2, 4]),
})
