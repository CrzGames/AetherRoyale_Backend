import GameMode from '#models/game_mode'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run() {
    await GameMode.updateOrCreateMany(
      ['queue_type', 'team_size'],
      [
        /**
         * =========================
         * NON CLASSÉ
         * =========================
         */
        {
          queue_type: 'unranked',
          team_size: 1,
          name: 'Solo non classé',
          description: 'Affrontez les autres joueurs en solo. Dernier survivant gagne.',
          min_players: 3,
          max_players: 100,
          is_enabled: true,
        },
        {
          queue_type: 'unranked',
          team_size: 2,
          name: 'Duo non classé',
          description: 'Formez une équipe de deux joueurs et survivez ensemble.',
          min_players: 3,
          max_players: 100,
          is_enabled: false,
        },
        {
          queue_type: 'unranked',
          team_size: 4,
          name: 'Squad non classé',
          description: 'Formez une équipe de quatre joueurs et dominez la partie.',
          min_players: 3,
          max_players: 100,
          is_enabled: false,
        },

        /**
         * =========================
         * CLASSÉ
         * =========================
         */
        {
          queue_type: 'ranked',
          team_size: 1,
          name: 'Solo classé',
          description: 'Mode compétitif solo avec classement et progression.',
          min_players: 3,
          max_players: 100,
          is_enabled: false,
        },
        {
          queue_type: 'ranked',
          team_size: 2,
          name: 'Duo classé',
          description: 'Mode compétitif en duo avec classement.',
          min_players: 3,
          max_players: 100,
          is_enabled: false,
        },
        {
          queue_type: 'ranked',
          team_size: 4,
          name: 'Squad classé',
          description: 'Mode compétitif en équipe de quatre joueurs.',
          min_players: 3,
          max_players: 100,
          is_enabled: false,
        },
      ],
    )
  }
}
