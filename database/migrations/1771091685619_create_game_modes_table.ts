import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'game_modes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Type de file d'attente associé à ce mode de jeu.
       *
       * Valeurs possibles :
       * - "unranked" : mode non classé (casual)
       * - "ranked"   : mode classé (MMR, ladder, etc.)
       *
       * Cette valeur correspond directement au bouton/toggle présent dans le menu du jeu :
       * - Le joueur coche "classé" ou "non classé"
       *
       * Elle permet au backend de :
       * - Séparer les files d’attente Redis
       * - Appliquer des règles différentes (MMR plus tard)
       * - Activer/désactiver facilement certains modes
       */
      table.enum('queue_type', ['unranked', 'ranked']).notNullable()

      /**
       * Taille d'équipe pour ce mode de jeu.
       *
       * Exemples :
       * - 1 = Solo
       * - 2 = Duo
       * - 4 = Squad (4 joueurs par équipe)
       *
       * Cette valeur correspond directement au choix dans le menu du jeu :
       * - Solo
       * - Duo
       * - Quatre
       *
       * Elle est utilisée côté backend pour :
       * - Identifier la bonne file de matchmaking
       * - Calculer le nombre total d'équipes
       * - Adapter la logique de remplissage des parties
       */
      table.integer('team_size').unsigned().notNullable()

      /**
       * Nom lisible côté interface utilisateur.
       *
       * Exemples :
       * - "Solo non classé"
       * - "Solo classé"
       * - "Duo non classé"
       * - "Squad classé"
       *
       * Ce champ est utilisé uniquement pour l'affichage :
       * - Menu principal du jeu
       * - Écrans de sélection de mode
       * - Tooltips
       *
       * Important :
       * - Ce champ peut évoluer dans le temps (changement marketing/UI)
       * - Il ne doit PAS être utilisé comme identifiant technique
       * - L'identité réelle du mode repose sur (queue_type + team_size)
       */
      table.string('name', 100).notNullable()

      /**
       * Description détaillée du mode de jeu affichée dans l'interface.
       *
       * Exemples :
       * - "Affrontez 99 autres joueurs en solo. Dernier survivant gagne."
       * - "Formez une équipe de 2 joueurs et survivez ensemble."
       * - "Mode compétitif avec classement."
       *
       * Ce champ est purement informatif et sert à :
       * - Donner du contexte au joueur
       * - Expliquer les règles du mode
       * - Enrichir l'UI (menu, panneaux d'information, etc.)
       */
      table.text('description').notNullable()

      /**
       * Nombre minimum de joueurs requis pour lancer une partie.
       *
       * Exemple :
       * - min_players = 3
       *
       * Cela signifie que :
       * - La partie peut démarrer dès que 3 joueurs sont présents dans la file d'attente.
       *
       * Utilisation côté backend :
       * - Dès que la queue Redis atteint ce seuil,
       *   le serveur peut déclencher l’allocation d’un GameServer via Agones.
       */
      table.integer('min_players').unsigned().notNullable()

      /**
       * Nombre maximum de joueurs autorisés dans ce mode de jeu.
       *
       * Exemple :
       * - max_players = 100
       *
       * Cela représente la capacité maximale d'une partie.
       *
       * Utilisation côté backend :
       * - Limiter le nombre total de joueurs dans un match
       * - Arrêter d'accepter des joueurs une fois la limite atteinte
       * - Adapter la logique de matchmaking
       */
      table.integer('max_players').unsigned().notNullable()

      /**
       * Indique si le mode est actuellement actif.
       *
       * true  = disponible dans le jeu
       * false = désactivé temporairement
       *
       * Utile pour :
       * - Griser un mode dans le menu (ex: Duo pas encore prêt)
       * - Désactiver un mode sans supprimer les données
       * - Activer des modes progressivement
       */
      table.boolean('is_enabled').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      /**
       * Contrainte d'unicité garantissant qu'un mode est défini
       * uniquement par la combinaison :
       *
       * - queue_type (ranked/unranked)
       * - team_size (1/2/4)
       *
       * Exemples valides :
       * - (unranked, 1) → Solo non classé
       * - (ranked, 1)   → Solo classé
       * - (unranked, 2) → Duo non classé
       *
       * Impossible d'avoir deux fois :
       * - (unranked, 1)
       */
      table.unique(['queue_type', 'team_size'])
      table.index(['queue_type'])
      table.index(['team_size'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
