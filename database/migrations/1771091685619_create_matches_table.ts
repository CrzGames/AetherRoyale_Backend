import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Type de match joue.
       *
       * Decision produit actuelle:
       * - Un seul format supporte par le backend: "normal_1v1"
       *
       * Pourquoi garder cette colonne meme avec un seul type ?
       * - Historiser explicitement le format en base
       * - Garder un schema evolutif si un jour tu reintroduis d'autres formats
       *   (sans remettre queue_type/team_size/ranked/unranked)
       */
      table.enum('match_type', ['normal_1v1']).notNullable().defaultTo('normal_1v1')

      /**
       * Nom du GameServer Agones ayant heberge le match.
       *
       * Utilise pour:
       * - debug infra
       * - correlation backend <-> gameserver <-> kubernetes
       */
      table.string('agones_gameserver_name', 255).nullable()

      /**
       * Nom du node Kubernetes qui executait le GameServer.
       *
       * Utilise pour:
       * - troubleshooting infra
       * - analyse de stabilite par node
       */
      table.string('agones_node_name', 255).nullable()

      /**
       * Nombre de joueurs effectivement assignes au match.
       *
       * Sur le flux 1v1, la valeur cible est 2.
       * On laisse un default a 0 pour representer un match cree mais pas encore rempli.
       */
      table.integer('players_count').unsigned().notNullable().defaultTo(0)

      /**
       * Statut final du match ecrit en base.
       *
       * - finished: fin normale
       * - aborted: fin volontaire / annulation
       * - crashed: interruption technique
       */
      table.enum('status', ['finished', 'aborted', 'crashed']).notNullable().defaultTo('finished')

      /**
       * started_at: instant de debut reel du match
       * ended_at: instant de fin reel du match
       */
      table.timestamp('started_at').nullable()
      table.timestamp('ended_at').nullable()

      /**
       * Timestamps standards de creation / mise a jour.
       */
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      /**
       * Index utile pour filtrer des historiques/statistiques par type de match.
       */
      table.index(['match_type'])

      /**
       * Index utile pour les listes chronologiques de matchs.
       */
      table.index(['started_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
