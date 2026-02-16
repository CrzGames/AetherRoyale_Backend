import router from '@adonisjs/core/services/router'

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
import './routes/aetherroyale_s3.js'

/**
 * Cette route est utilisée pour tester le fonctionnement de base de l'application.
 */
router.get('/', async (): Promise<{ hello: string }> => {
  return {
    hello: 'test',
  }
})
