import type { ApplicationService } from '@adonisjs/core/types'
import NatsService from '#services/nats_service'

/**
 * Un fournisseur pour gérer les connexions NATS dans l'application AdonisJS.
 */
export default class NatProvider {
  /**
   * Crée une instance de NatProvider.
   * @param {ApplicationService} app - L'instance du service d'application AdonisJS.
   */
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  public register(): void {
    // Enregistrer NatsService en tant que singleton dans le conteneur IoC
    this.app.container.singleton(NatsService, () => {
      return new NatsService()
    })

    // Alias NatsService pour une utilisation facile dans l'application
    this.app.container.alias('natsService', NatsService)
  }

  /**
   * The container bindings have booted
   */
  public async boot(): Promise<void> {}

  /**
   * The application has been booted
   */
  public async start(): Promise<void> {}

  /**
   * The process has been started
   */
  public async ready(): Promise<void> {
    // Résoudre NatsService lorsque le serveur HTTP est prêt à accepter des requêtes
    const natsService: NatsService = await this.app.container.make('natsService')
    await natsService.connect()
  }

  /**
   * Preparing to shutdown the app
   */
  public async shutdown(): Promise<void> {
    // Résoudre NatsService lorsque AdonisJS est en train de fermer l'application de manière gracieuse
    const natsService: NatsService = await this.app.container.make('natsService')
    await natsService.close()
  }
}