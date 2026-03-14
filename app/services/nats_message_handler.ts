import logger from '@adonisjs/core/services/logger'

/**
 * Gère le traitement métier des messages NATS.
 */
export default class NatsMessageHandler {
  /**
   * Handler pour le sujet "mon.sujet"
   */
  public static handleMonSujet(message: string): void {
    try {
      logger.info({ message }, 'Traitement du message mon.sujet')

      // Exemple :
      const payload: any = JSON.parse(message)
      logger.info({ payload }, 'Payload du message mon.sujet')
    } catch (error) {
      logger.error({ err: error, message }, 'Erreur pendant le traitement de mon.sujet')
      throw error
    }
  }
}
