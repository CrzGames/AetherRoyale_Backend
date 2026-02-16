import router from '@adonisjs/core/services/router'
const S3Controller = () => import('#controllers/s3_controller')

router.get('/s3/list-game-client-builds', [S3Controller, 'listGameClientBuilds'])
