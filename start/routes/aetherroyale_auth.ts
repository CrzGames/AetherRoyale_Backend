import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router.post('/auth/sign-up', [AuthController, 'signUp'])
router.post('/auth/sign-in', [AuthController, 'signIn'])
