import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

/**
 * Route pour l'authentification des utilisateurs pour la connexion
 * de SeaTyrants.
 *
 * Cette route est utilisée pour permettre aux utilisateurs de se connecter
 * à l'application SeaTyrants. Elle est sécurisée et nécessite des informations
 * d'identification valides.
 */
router.post('/auth/signin', [AuthController, 'signIn'])
