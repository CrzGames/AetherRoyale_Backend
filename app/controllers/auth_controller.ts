import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import { signInValidator, signUpValidator } from '#validators/auth_validator'
import type { SignUpRequestBody, SingInRequestBody } from '#interfaces/auth_request_body_interfaces'
import type { SignUpData, SingInData } from '#types/auth_types'
import type { LoginSuccessResponseBody } from '#interfaces/auth_response_body_interfaces'
import logger from '@adonisjs/core/services/logger'
import type User from '#models/user'

/**
 * Contrôleur d'authentification gérant les processus d'identification.
 * @class AuthController
 */
export default class AuthController {
  /**
   * @signUp
   * @operationId signUp
   * @tag Auth
   * @summary Inscription d'un utilisateur
   * @description Crée un nouveau compte utilisateur et envoie un e-mail avec un code d'activation à 6 chiffres pour activer le compte
   * @requestBody <SignUpRequestBody>
   * @content application/json
   * @responseBody 201 - <SuccessResponseBody> - Compte créé avec succès
   * @responseBody 422 - <ValidationErrorResponseBody> - Erreurs de validation des données
   * @responseBody 500 - <ErrorResponseBody> - Erreur interne du serveur
   */
  /**
   * Handle user signup
   * @param {HttpContext} ctx - The HTTP context containing the request and response objects
   * @param {HttpContext['request']} ctx.request - The HTTP request object
   * @param {HttpContext['response']} ctx.response - The HTTP response object
   * @returns {Promise<void>} - A promise that resolves with no return value
   */
  public async signUp({ request, response }: HttpContext): Promise<void> {
    // Valider les données de la requête avec VineJS
    const payload: SignUpRequestBody = await request.validateUsing(signUpValidator)

    // Créer l'objet SignUpData à partir du payload validé
    const data: SignUpData = {
      username: payload.username,
      email: payload.email,
      password: payload.password,
    }

    // Log de la tentative d'inscription avec email et username
    logger.info({ email: data.email, username: data.username }, 'SignUp attempt')

    // Appeler le service Auth pour créer le compte utilisateur
    await AuthService.signUp(data)

    // Retourner une réponse de succès
    response.status(201).json({ message: 'Account created successfully' })
  }

  /**
   * @signIn
   * @operationId signIn
   * @tag Auth
   * @summary Authentifie un utilisateur et retourne les informations de connexion (clé de chiffrement, access token).
   * @description Valide les identifiants de l'utilisateur et retourne une clé de chiffrement symétrique unique utilisant XChaCha20-Poly1305 pour sécuriser les paquets UDP du joueur, ainsi qu’un access token opaque généré  par AdonisJS (préfixé "oat_"). Ce token doit être utilisé par le client dans l’en-tête HTTP "Authorization: Bearer <token>" pour authentifier les requêtes API. Sa durée de validité dépend de la configuration du provider (ex: 2 jours si configuré côté serveur).
   * @requestBody <SingInRequestBody>
   * @responseBody 200 - <LoginSuccessResponseBody> - Connexion réussie
   * @responseBody 422 - <ValidationErrorResponseBody> - Erreur de validation des données
   * @responseBody 401 - <ErrorResponseBody> - Identifiants invalides
   * @responseBody 500 - <ErrorResponseBody> - Erreur serveur lors de la connexion
   */
  /**
   * Authentifie l'utilisateur en validant ses identifiants et en renvoyant les informations de connexion.
   * @param {HttpContext} ctx - Le contexte HTTP contenant la requête et la réponse.
   * @param {Object} ctx.request - L'objet de requête HTTP.
   * @param {Object} ctx.response - L'objet de réponse HTTP.
   * @returns {Promise<void>} - Une promesse qui ne retourne rien mais envoie une réponse HTTP.
   */
  public async signIn({ request, response, auth }: HttpContext): Promise<void> {
    // Valider les données de la requête avec VineJS
    const payload: SingInRequestBody = await request.validateUsing(signInValidator)

    /**
     * Créer l'objet SignIn qui étend SingInRequestBody et
     * ajoute l'ipAddress pour l'envoi au service Auth
     */
    const signIn: SingInData = {
      email: payload.email,
      password: payload.password,
    }

    // Log de la tentative de connexion avec email/password et check IP
    logger.info({ email: signIn.email }, 'SignIn attempt')

    // Appeler le service Auth pour authentifier l'utilisateur
    const signInResponse: LoginSuccessResponseBody = await AuthService.signIn(signIn, auth)

    // Retourner la réponse de connexion réussie
    return response.status(200).send(signInResponse)
  }

  /**
   * @validateToken
   * @operationId validateToken
   * @tag Auth
   * @summary Valide un access token et retourne les informations de l'utilisateur associé.
   * @description Valide un access token opaque (préfixé "oat_") envoyé dans l'en-tête HTTP "Authorization: Bearer <token>" et retourne les informations de l'utilisateur associé si le token est valide. Si le token est invalide ou expiré, une erreur 401 Unauthorized est retournée.
   * @requestBody <ValidateTokenRequestBody>
   * @responseBody 200 - <ValidateTokenSuccessResponseBody> - Token valide, informations de l'utilisateur retournées
   * @responseBody 401 - <ErrorResponseBody> - Token invalide ou expiré
   * @responseBody 500 - <ErrorResponseBody> - Erreur serveur lors de la validation du token
   */
  /**
   * Valide un access token et retourne les informations de l'utilisateur associé.
   * @param {HttpContext} ctx - Le contexte HTTP contenant la requête et la réponse.
   * @param {Object} ctx.response - L'objet de réponse HTTP.
   * @param {Object} ctx.auth - L'objet d'authentification AdonisJS contenant les informations de l'utilisateur authentifié.
   * @returns {void} - Une promesse qui ne retourne rien mais envoie une réponse HTTP.
   */
  public validateToken({ response, auth }: HttpContext): void {
    // Si le middleware d'authentification a réussi, cela signifie que le token est valide et que l'utilisateur est authentifié
    const user: User = auth.user!

    // Retourner une réponse indiquant que le token est valide et inclure les informations de l'utilisateur
    response.status(200).json({
      user: {
        id: user.id,
        username: user.username,
      },
    })
  }
}
