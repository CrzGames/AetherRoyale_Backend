import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Match from '#models/match'
import User from '#models/user'

export default class MatchPlayer extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public match_id: number

  @column()
  declare public user_id: number

  @column()
  declare public placement: number

  @column()
  declare public kills: number

  @column()
  declare public pvp_damage: number

  @column.dateTime({ autoCreate: true })
  declare public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare public updated_at: DateTime | null

  /**
   * Relations
   */

  @belongsTo(() => Match, {
    foreignKey: 'match_id',
  })
  declare public match: BelongsTo<typeof Match>

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare public user: BelongsTo<typeof User>
}
