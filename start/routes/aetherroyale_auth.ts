import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')

router.post('/auth/sign-up', [AuthController, 'signUp'])
router.post('/auth/sign-in', [AuthController, 'signIn'])
router.post('/auth/validate-token', [AuthController, 'validateToken']).use(middleware.auth())