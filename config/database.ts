import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'
import { DatabaseConfig } from '@adonisjs/lucid/types/database'

const dbConfig: DatabaseConfig = defineConfig({
  connection: env.get('DB_CONNECTION'),
  connections: {
    mysql: {
      client: 'mysql2',
      debug: env.get('DB_DEBUG'),
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE_NAME'),
        charset: 'utf8mb4',
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
        disableRollbacksInProduction: true,
      },
    },
  },
})

export default dbConfig
