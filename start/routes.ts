import router from '@adonisjs/core/services/router'
import { allocateGameServerInFleet } from '#services/agones_allocator_service'
import { AllocationSecurityData } from '#types/agones_types'

/**
 * Routes système
 */
import './routes/swagger.js'
import './routes/health.js'

/**
 * Routes métiers
 */
import './routes/aetherroyale_auth.js'
import './routes/aetherroyale_agones.js'

/**
 * Cette route est utilisée pour tester le fonctionnement de base de l'application.
 */
router.get('/', async (): Promise<{ hello: string }> => {
  return {
    hello: 'test',
  }
})

// Route de test pour l'allocation d'un GameServer via Agones Allocator
router.get('/test/agones-allocate', async ({ response }) => {
  const data: AllocationSecurityData = await allocateGameServerInFleet()

  return response.ok(data)
})
