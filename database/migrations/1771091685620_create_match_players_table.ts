import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'match_players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Reference vers le match auquel appartient cette ligne de stats.
       *
       * onDelete CASCADE:
       * - si le match disparait, ses stats joueurs doivent disparaitre aussi.
       */
      table.integer('match_id').unsigned().notNullable().references('id').inTable('matches').onDelete('CASCADE')

      /**
       * Reference vers le joueur (users.id) ayant participe au match.
       *
       * onDelete CASCADE:
       * - garde l'integrite si un user est supprime.
       */
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')

      /**
       * Placement final du joueur.
       *
       * Contexte 1v1:
       * - 1 = vainqueur
       * - 2 = second
       */
      table.integer('placement').unsigned().notNullable()

      /**
       * Kills PVP realises par le joueur pendant le match.
       */
      table.integer('kills').unsigned().notNullable().defaultTo(0)

      /**
       * Total de degats PVP infliges.
       */
      table.integer('pvp_damage').unsigned().notNullable().defaultTo(0)

      /**
       * Timestamps standards.
       */
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      /**
       * Un joueur ne peut apparaitre qu'une seule fois dans un match.
       */
      table.unique(['match_id', 'user_id'])

      /**
       * Index requis pour l'historique joueur et les scoreboards.
       */
      table.index(['user_id'])
      table.index(['match_id', 'placement'])
      table.index(['match_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
