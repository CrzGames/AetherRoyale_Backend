import vine from '@vinejs/vine'

/**
 * Sign in validator
 * @type {Object}
 */
export const signInValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().trim(),
  }),
)
