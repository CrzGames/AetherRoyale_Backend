import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const MatchmakingController = () => import('#controllers/matchmaking_controller')

router.post('/matchmaking/join', [MatchmakingController, 'matchmakingJoin']).use(middleware.auth())
