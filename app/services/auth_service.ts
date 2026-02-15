import type { SingInData } from '#types/auth_types'
import type { LoginSuccessResponseBody } from '#interfaces/auth_response_body_interfaces'

/**
 * Service d'authentification gérant les processus d'identification pour le client SeaTyrants.
 * @class AuthService
 */
export default class AuthService {
  /**
   * Valide les identifiants de connexion d'un utilisateur et retourne les informations de connexion.
   * @param {SingInData} data - Les données de la requête de connexion (email, mot de passe, adresse IP).
   * @returns {Promise<LoginSuccessResponseBody>} - Les données de connexion incluant la liste des serveurs, la clé de chiffrement et le token JWT.
   */
  public static async signIn(data: SingInData): Promise<LoginSuccessResponseBody> {
    return
  }
}
