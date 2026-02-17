import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'match_players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Référence vers le match (la partie) auquel appartiennent ces statistiques.
       *
       * Cette colonne pointe vers la table `matches`, qui représente une partie jouée.
       *
       * Utilisation :
       * - Rattacher les stats d’un joueur à une partie précise
       * - Reconstituer le scoreboard complet d’une partie
       * - Faire des requêtes comme : "donne-moi tous les joueurs du match X"
       *
       * Suppression :
       * - CASCADE : si un match est supprimé, toutes ses lignes `match_players` sont supprimées aussi,
       *   car elles n'ont aucun sens sans leur match.
       */
      table.integer('match_id').unsigned().notNullable().references('id').inTable('matches').onDelete('CASCADE')

      /**
       * Référence vers l'utilisateur ayant participé au match.
       *
       * Cette colonne pointe vers la table `users` (compte Adonis).
       *
       * Utilisation :
       * - Historique d'un joueur : retrouver tous ses matchs
       * - Statistiques globales joueur : moyenne de kills, top placements, etc.
       * - Classements (plus tard) : calcul MMR, winrate, etc.
       *
       * Suppression :
       * - CASCADE : si un utilisateur est supprimé (cas rare), on supprime aussi ses stats de matchs
       *   pour garder l'intégrité des données.
       */
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')

      /**
       * Placement final du joueur dans la partie.
       *
       * Exemple :
       * - placement = 1  → le joueur a gagné la partie
       * - placement = 2  → le joueur finit 2ème
       * - placement = 3  → le joueur finit 3ème
       *
       * Dans un Battle Royale (max 100 joueurs), placement est typiquement entre :
       * - 1 et players_count (ou max_players du mode)
       *
       * Utilisation :
       * - Afficher le résultat de la partie (scoreboard)
       * - Faire des stats : top 1 / top 3 / top 10
       * - Base pour le ranked (plus tard)
       */
      table.integer('placement').unsigned().notNullable()

      /**
       * Nombre de kills réalisés par le joueur pendant la partie.
       *
       * Important :
       * - On parle ici de kills contre d'autres joueurs (PVP).
       * - Valeur >= 0.
       *
       * Utilisation :
       * - Scoreboard
       * - Stats globales joueur (moyenne de kills, record, etc.)
       * - Plus tard : impact sur MMR / ranking
       */
      table.integer('kills').unsigned().notNullable().defaultTo(0)

      /**
       * Dégâts PVP infligés par le joueur (contre des joueurs).
       *
       * Exemple :
       * - pvp_damage = 650 (le joueur a infligé 650 points de dégâts au total)
       *
       * Important :
       * - Cela ne doit PAS inclure les dégâts environnement (zone, fall damage, etc.)
       * - Cela ne doit PAS inclure des dégâts PVE (si tu ajoutes des mobs plus tard)
       *
       * Utilisation :
       * - Scoreboard et métriques de performance
       * - Stats joueur : "dégâts moyens par match"
       * - Détection potentielle (plus tard) de comportements anormaux
       */
      table.integer('pvp_damage').unsigned().notNullable().defaultTo(0)

      /**
       * Timestamps standards de création/mise à jour.
       *
       * created_at : moment où la ligne a été créée (souvent à la fin du match)
       * updated_at : si tu mets à jour progressivement pendant la partie (optionnel)
       */
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      /**
       * Contrainte d'unicité :
       * - Un joueur ne doit apparaître qu'une seule fois par match.
       *
       * Cela évite :
       * - les doublons lors d'un insert retry
       * - les bugs où le backend écrit deux fois les stats
       */
      table.unique(['match_id', 'user_id'])

      /**
       * Index pour requêtes fréquentes :
       *
       * - Retrouver rapidement l'historique des matchs d'un joueur :
       *   SELECT * FROM match_players WHERE user_id = ?
       */
      table.index(['user_id'])

      /**
       * Index pour reconstituer le scoreboard d'une partie :
       *   SELECT * FROM match_players WHERE match_id = ? ORDER BY placement ASC
       */
      table.index(['match_id', 'placement'])

      /**
       * Index simple utile pour :
       * - récupérer tous les joueurs d'un match
       */
      table.index(['match_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
