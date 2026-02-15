import sodium from 'libsodium-wrappers'
import InternalServerErrorException from '#exceptions/internal_server_error_exception'
import logger from '@adonisjs/core/services/logger'

/**
 * Service pour la génération de clés de chiffrement.
 * Utilise la bibliothèque libsodium pour générer des clés sécurisées.
 * @class EncryptionService
 */
export default class EncryptionService {
  /**
   * Génère une clé de chiffrement unique utilisant XChaCha20Poly1305.
   * @returns {Promise<string>} - Une promesse qui retourne une clé de chiffrement unique encodée en base64.
   * @throws {InternalServerErrorException} - Si une erreur survient lors de la génération de la clé.
   */
  public static async generateEncryptionKey(): Promise<string> {
    try {
      // Attendre que la bibliothèque libsodium soit prête
      await sodium.ready

      // Générer une clé de chiffrement avec XChaCha20Poly1305, encodée en base64
      return sodium.crypto_secretstream_xchacha20poly1305_keygen('base64')
    } catch (error: any) {
      // Journaliser l'erreur pour le débogage
      logger.error('Erreur lors de la génération de la clé de chiffrement: ' + error)

      // Lever une exception personnalisée pour signaler l'erreur
      throw new InternalServerErrorException('Erreur lors de la génération de la clé de chiffrement')
    }
  }
}