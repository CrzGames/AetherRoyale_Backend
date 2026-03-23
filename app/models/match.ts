import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import MatchPlayer from '#models/match_player'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public match_type: 'normal_1v1'

  @column()
  declare public agones_gameserver_name: string | null

  @column()
  declare public agones_node_name: string | null

  @column()
  declare public players_count: number

  @column()
  declare public status: 'finished' | 'aborted' | 'crashed'

  @column.dateTime()
  declare public started_at: DateTime | null

  @column.dateTime()
  declare public ended_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare public updated_at: DateTime | null

  @hasMany(() => MatchPlayer, {
    foreignKey: 'match_id',
  })
  declare public match_players: HasMany<typeof MatchPlayer>
}
