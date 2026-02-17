import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Match from '#models/match'

export default class GameMode extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public queue_type: 'unranked' | 'ranked'

  @column()
  declare public team_size: number

  @column()
  declare public name: string

  @column()
  declare public description: string

  @column()
  declare public min_players: number

  @column()
  declare public max_players: number

  @column()
  declare public is_enabled: boolean

  @column.dateTime({ autoCreate: true })
  declare public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare public updated_at: DateTime | null

  /**
   * Relations
   */
  @hasMany(() => Match, {
    foreignKey: 'game_mode_id',
  })
  declare public matches: HasMany<typeof Match>
}
