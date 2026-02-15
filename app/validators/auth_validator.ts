import vine from '@vinejs/vine'

/**
 * Sign in validator
 * @type {Object}
 */
export const signInValidator = vine.create({
  email: vine.string().email().trim(),
  password: vine.string().trim(),
})

/**
 * Sign up validator
 * @type {Object}
 */
export const signUpValidator = vine.create({
  username: vine.string().trim(),
  email: vine.string().email().trim(),
  password: vine.string().trim(),
})
