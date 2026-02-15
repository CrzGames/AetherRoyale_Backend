import type { SignUpData, SingInData } from '#types/auth_types'
import type { LoginSuccessResponseBody } from '#interfaces/auth_response_body_interfaces'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import logger from '@adonisjs/core/services/logger'
import InternalServerErrorException from '#exceptions/internal_server_error_exception'
import env from '#start/env'

/**
 * Service d'authentification gérant les processus d'identification pour le client SeaTyrants.
 * @class AuthService
 */
export default class AuthService {
  /**
   * Méthode pour l'inscription d'un utilisateur
   * @param {SignUpData} data - Les données d'inscription de l'utilisateur
   * @returns {Promise<void>} - Retourne une promesse qui se résout lorsque l'utilisateur est inscrit
   */
  public static async signUp(data: SignUpData): Promise<void> {
    try {
      // Générer un code d'activation aléatoire à 6 chiffres.
      //const activeCode: number = Math.floor(100000 + Math.random() * 900000)

      // Créer un nouvel utilisateur avec les données fournies, dans la table 'users'.
      await User.create({
        username: data.username,
        email: data.email,
        password: data.password, // Automatiquement haché par le modèle User
        //active_code: activeCode,
      })

      // Envoyer un e-mail de bienvenue à l'utilisateur avec le code d'activation.
      /*await MailService.sendMail(
        user.email,
        'welcome',
        {
          username: user.username,
          code: user.active_code,
          redirect_uri:
            env.get('FRONTEND_APP_BASE_URL') + env.get('FRONTEND_APP_REDIRECT_URI_ACCOUNT_VALIDATE') + user.email,
        },
        'Welcome to CrzGames',
      )*/
    } catch (error: any) {
      logger.error({ error }, 'Signup error')

      // Erreur inattendue (base de données, SMTP, etc.)
      throw new InternalServerErrorException('Failed to create account')
    }
  }

  /**
   * Valide les identifiants de connexion d'un utilisateur et retourne les informations de connexion.
   * @param {SingInData} data - Les données de la requête de connexion (email, mot de passe, adresse IP).
   * @returns {Promise<LoginSuccessResponseBody>} - Les données de connexion incluant la liste des serveurs, la clé de chiffrement et le token JWT.
   */
  public static async signIn(data: SingInData, auth: HttpContext['auth']): Promise<LoginSuccessResponseBody> {
    try {
      // Récupérer l'utilisateur par son email
      let user: User = await User.findByOrFail('email', data.email)

      // Vérifier si le compte est activé
      /*if (!user.is_active) {
          throw new BadRequestException('Account is not active')
        }*/

      // Vérifier les identifiants de l'utilisateur
      user = await User.verifyCredentials(data.email, data.password)

      // Si le compte est activé et que les identifiants sont corrects, créer un access token (opaque oat_...)
      const token: AccessToken = await auth.use('api').createToken(user)

      return {
        token: {
          type: 'bearer',
          value: token.value!.release(),
          expiresAt: token.expiresAt ? token.expiresAt.toISOString() : null,
        },
        quilkin_dns: env.get('QUILKIN_DNS'),
        quilkin_port: env.get('QUILKIN_PORT'),
      } as LoginSuccessResponseBody
    } catch (error: any) {
      logger.error({ error }, 'Signin error')

      // Erreur d'identifiants invalides
      throw new InternalServerErrorException('Failed to authenticate')
    }
  }
}
