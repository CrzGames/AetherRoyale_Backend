import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import GameMode from '#models/game_mode'
import MatchPlayer from '#models/match_player'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public game_mode_id: number

  @column()
  declare public agones_gameserver_name: string | null

  @column()
  declare public agones_node_name: string | null

  @column()
  declare public players_count: number

  @column()
  declare public status: 'finished' | 'aborted' | 'crashed'

  @column.dateTime()
  declare public started_at: DateTime

  @column.dateTime()
  declare public ended_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare public updated_at: DateTime | null

  /**
   * Relations
   */

  @belongsTo(() => GameMode, {
    foreignKey: 'game_mode_id',
  })
  declare public game_mode: BelongsTo<typeof GameMode>

  @hasMany(() => MatchPlayer, {
    foreignKey: 'match_id',
  })
  declare public match_players: HasMany<typeof MatchPlayer>
}
