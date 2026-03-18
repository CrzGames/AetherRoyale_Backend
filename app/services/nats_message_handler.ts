import logger from '@adonisjs/core/services/logger'
import type { GameserverSimulationEtatMetricsPayload } from '#types/gameserver'

/**
 * Gère le traitement métier des messages NATS.
 */
export default class NatsMessageHandler {
  /**
   * Traite les messages reçus sur le sujet 'gameserver.simulation.etat.metrics'.
   * @param {string} message - Le message NATS reçu, attendu au format JSON.
   */
  public static handleGameserverSimulationEtatMetrics(message: string): void {
    try {
      const data: GameserverSimulationEtatMetricsPayload = JSON.parse(message) as GameserverSimulationEtatMetricsPayload
      logger.info('Parsed data: %j', data)
    } catch (error) {
      logger.error('Failed to parse message: %s', error.message)
    }
  }
}
