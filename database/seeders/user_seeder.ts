import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  public async run() {
    await User.updateOrCreate(
      { email: 'dev@aetherroyale.com' }, // clé unique pour éviter les doublons
      {
        username: 'dev_player',
        email: 'dev@aetherroyale.com',
        password: 'password123', // sera hashé auto par le modèle User
      },
    )
  }
}
