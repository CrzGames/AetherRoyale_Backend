import router from '@adonisjs/core/services/router'
const AgonesController = () => import('#controllers/agones_controller')

router.post('/agones/fleet/autoscale', [AgonesController, 'AgonesFleetAutoScale'])
