import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import { signInValidator } from '#validators/auth_validator'
import type { SingInRequestBody } from '#interfaces/auth_request_body_interfaces'
import type { SingInData } from '#types/auth_types'
import type { LoginSuccessResponseBody } from '#interfaces/auth_response_body_interfaces'

/**
 * Contrôleur d'authentification gérant les processus d'identification.
 * @class AuthController
 */
export default class AuthController {
  /**
   * @signIn
   * @summary Authentifie un utilisateur et retourne les informations de connexion (serveurs, clé de chiffrement, token JWT).
   * @description Valide les identifiants de l'utilisateur et retourne une liste de serveurs, une clé de chiffrement unique utilisant XChaCha20Poly1305 (pour les packets UDP du joueur) et un token JWT signé de type RSA512 valide 2 jours.
   * @operationId signIn
   * @requestBody <SingInRequestBody>
   * @responseBody 200 - <LoginSuccessResponseBody> - Connexion réussie
   * @responseBody 422 - <ValidationErrorResponseBody> - Erreur de validation des données
   * @responseBody 401 - <ErrorResponseBody> - Identifiants invalides
   * @responseBody 403 - <ErrorResponseBody> - Accès interdit (VPN/Proxy détecté)
   * @responseBody 500 - <ErrorResponseBody> - Erreur serveur lors de la connexion
   */
  /**
   * Authentifie l'utilisateur en validant ses identifiants et en renvoyant les informations de connexion.
   * @param {HttpContext} ctx - Le contexte HTTP contenant la requête et la réponse.
   * @param {Object} ctx.request - L'objet de requête HTTP.
   * @param {Object} ctx.response - L'objet de réponse HTTP.
   * @returns {Promise<void>} - Une promesse qui ne retourne rien mais envoie une réponse HTTP.
   * @throws {VineValidationException} - Si les données de la requête sont invalides.
   * @throws {ForbiddenException} - Si un VPN ou proxy est détecté.
   * @throws {UnauthorizedException} - Si les identifiants sont invalides.
   * @throws {InternalServerErrorException} - Si une erreur serveur survient.
   */
  public async signIn({ request, response }: HttpContext): Promise<void> {
    // Valider les données de la requête avec VineJS
    const payload: SingInRequestBody = await signInValidator.validate(request.all())

    /**
     * Créer l'objet SignIn qui étend SingInRequestBody et
     * ajoute l'ipAddress pour l'envoi au service Auth
     */
    const signIn: SingInData = {
      email: payload.email,
      password: payload.password,
      ipAddress: request.ip(),
    }

    // Appeler le service Auth pour authentifier l'utilisateur
    const signInResponse: LoginSuccessResponseBody = await AuthService.signIn(signIn)

    // Retourner la réponse de connexion réussie
    return response.status(200).send(signInResponse)
  }
}
