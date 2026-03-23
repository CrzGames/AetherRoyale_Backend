import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const MatchmakingController = () => import('#controllers/matchmaking_controller')

// Bouton "Recherche une partie" cote client du jeu => POST /matchmaking/join
router.post('/matchmaking/join', [MatchmakingController, 'matchmakingJoin']).use(middleware.auth())

// Bouton "Annuler la recherche de partie" cote client du jeu => POST /matchmaking/cancel
router.post('/matchmaking/cancel', [MatchmakingController, 'matchmakingCancel']).use(middleware.auth())
