import type NatsService from '#services/nats_service'

/**
 * Etendons le module '@adonisjs/core/types' pour ajouter des types personnalisés
 * C'est surtout concernant les provideurs qui sont enregistrés dans le conteneur IoC.
 */
declare module '@adonisjs/core/types' {
  /**
   * Interface pour les types de conteneur IoC.
   * @interface ContainerBindings
   * @property {NatsService} natsService - Service NATS pour gérer les connexions et les abonnements.
   */
  interface ContainerBindings {
    natsService: NatsService
  }
}