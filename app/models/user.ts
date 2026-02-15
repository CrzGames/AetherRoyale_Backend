import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import env from '#start/env'
import { Hash } from '@adonisjs/core/hash'

/**
 * Fonction de mixin pour la gestion de l'authentification.
 * Doc : https://docs.adonisjs.com/guides/authentication/verifying-user-credentials
 */
const AuthFinder: ReturnType<typeof withAuthFinder> = withAuthFinder((): Hash => hash.use(), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public username: string

  @column()
  declare public email: string

  @column({ serializeAs: null })
  declare public password: string

  @column.dateTime({ autoCreate: true })
  declare public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare public updatedAt: DateTime | null

  /**
   * The access token provider for the user model.
   * This provider is used to generate and validate access tokens for the user.
   */
  public static accessTokens: DbAccessTokensProvider<typeof User> = DbAccessTokensProvider.forModel(User, {
    expiresIn: env.get('API_USER_TOKEN_EXPIRATION'),
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: env.get('API_USER_TOKEN_SECRET_LENGTH'),
  })
}
