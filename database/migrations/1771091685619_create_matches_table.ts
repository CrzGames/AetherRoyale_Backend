import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Référence vers le mode de jeu utilisé pour cette partie.
       *
       * Cette colonne pointe vers la table `game_modes`, qui décrit :
       * - si la file est "ranked" ou "unranked"
       * - la taille d'équipe (solo/duo/quatre)
       * - le min/max joueurs requis/autorisé
       * - si le mode est activé dans le menu
       *
       * Exemple :
       * - game_mode_id => (queue_type="unranked", team_size=1, min_players=3, max_players=100)
       *
       * Utilisation côté backend :
       * - Savoir quel type de match a été joué
       * - Faire des statistiques par mode (solo non classé, duo classé, etc.)
       * - Filtrer l’historique de matchs d’un joueur par mode
       */
      table
        .integer('game_mode_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('game_modes')
        .onDelete('RESTRICT')

      /**
       * Nom du GameServer Agones alloué pour ce match.
       *
       * Exemple typique :
       * - "ashen-kingdoms-fleet-7d9f8b5c7f-k2l9p"
       * (le format exact dépend de ta Fleet / naming / allocator)
       *
       * Pourquoi stocker ça alors qu'on utilise Quilkin ?
       * - Debug : retrouver précisément quel GameServer a servi le match
       * - Corrélation de logs : backend ↔ gameserver ↔ node Kubernetes
       * - Investigation crash : identifier le pod responsable
       *
       * Note :
       * - Le client ne s’en sert pas.
       * - C'est une donnée serveur (observabilité).
       */
      table.string('agones_gameserver_name', 255).nullable()

      /**
       * Nom du node Kubernetes sur lequel le GameServer Agones tournait.
       *
       * Exemple :
       * - "k8s-gameservers-pool-3c1f2a-node-7"
       *
       * Pourquoi stocker ça ?
       * - Debug : savoir si les crashs viennent d'un node spécifique
       * - Observabilité : corrélation avec métriques du node (CPU/RAM/network)
       *
       * Note :
       * - Le client ne s’en sert pas.
       * - C'est une donnée serveur (observabilité).
       */
      table.string('agones_node_name', 255).nullable()

      /**
       * Nombre réel de joueurs ayant effectivement participé à cette partie.
       *
       * Pourquoi on stocke cette valeur ?
       * - Même si on peut calculer COUNT(*) dans `match_players`,
       *   l'avoir ici rend les requêtes de stats beaucoup plus simples et rapides.
       *
       * Exemple :
       * - Le mode autorise jusqu'à 100 joueurs (game_modes.max_players = 100)
       * - Mais cette partie a réellement commencé avec 37 joueurs (players_count = 37)
       *
       * Utilisation :
       * - Statistiques (remplissage moyen d'un mode)
       * - Debug (match démarré trop tôt / trop tard)
       * - Analytics (taux de remplissage, rétention, etc.)
       */
      table.integer('players_count').unsigned().notNullable()

      /**
       * Statut final de la partie.
       *
       * Valeurs possibles :
       * - finished : la partie s'est terminée normalement (victoire / fin de zone / etc.)
       * - aborted  : la partie a été stoppée volontairement (maintenance, admin, etc.)
       * - crashed  : la partie s'est arrêtée suite à un crash serveur / bug fatal
       *
       * Utilisation :
       * - Filtrer les matchs valides dans l'historique du joueur
       * - Debug des problèmes serveurs
       * - Exclure les matchs "crashed" des stats/ranked (plus tard)
       */
      table.enum('status', ['finished', 'aborted', 'crashed']).notNullable().defaultTo('finished')

      /**
       * Date/heure de démarrage de la partie.
       *
       * Représente le moment où la partie est considérée "commencée" côté gameplay.
       * Par exemple :
       * - après la phase de lobby/warmup
       * - au lancement du Battle Royale (début de la zone / spawn / drop)
       *
       * Important :
       * - Ce timestamp doit rester cohérent pour toutes les parties,
       *   car il sert de base à la durée du match et aux analytics.
       */
      table.timestamp('started_at').notNullable()

      /**
       * Date/heure de fin de la partie.
       *
       * Valeur NULL si :
       * - la partie est encore en cours
       * - le match a crash et la fin n'a pas été écrite
       *
       * Utilisation :
       * - Calculer la durée d'un match (ended_at - started_at)
       * - Statistiques sur la durée moyenne
       * - Déterminer si un match est "stuck" (toujours NULL après X minutes)
       */
      table.timestamp('ended_at').nullable()

      /**
       * Timestamps standards de création/mise à jour.
       *
       * created_at : moment où l'entrée match a été créée en base
       * updated_at : dernière mise à jour (ex: fin du match, statut modifié, etc.)
       */
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      /**
       * Index pour accélérer :
       * - statistiques par mode (group by game_mode_id)
       * - listes de matchs filtrées par mode
       */
      table.index(['game_mode_id'])

      /**
       * Index pour accélérer :
       * - récupération des matchs récents (order by started_at desc)
       * - stats par période (par jour/semaine/mois)
       */
      table.index(['started_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
