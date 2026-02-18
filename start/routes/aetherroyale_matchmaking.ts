import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const MatchmakingController = () => import('#controllers/matchmaking_controller')

// Boutton "Recherche une partie" côté client du jeu => POST /matchmaking/join
router.post('/matchmaking/join', [MatchmakingController, 'matchmakingJoin']).use(middleware.auth())

// Boutton "Annuler la recherche de partie" côté client du jeu => POST /matchmaking/leave
router.post('/matchmaking/cancel', [MatchmakingController, 'matchmakingCancel']).use(middleware.auth())
