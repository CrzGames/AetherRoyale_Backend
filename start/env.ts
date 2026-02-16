/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import '@foadonis/crypt'
import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'staging', 'production', 'test'] as const),
  HASH_DRIVER: Env.schema.enum(['bcrypt', 'argon', 'scrypt'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE_NAME: Env.schema.string(),
  DB_DEBUG: Env.schema.boolean(),
  DB_CONNECTION: Env.schema.string(),
  HEALTH_API_KEY_SECRET: Env.schema.string(),
  API_USER_TOKEN_EXPIRATION: Env.schema.string(),
  API_USER_TOKEN_SECRET_LENGTH: Env.schema.number(),
  AGONES_ALLOCATOR_ENDPOINT_GRPC: Env.schema.string(),
  AGONES_GAMESERVERS_NAMESPACE: Env.schema.string(),
  AGONES_FLEET_NAME: Env.schema.string(),
  QUILKIN_DNS: Env.schema.string(),
  QUILKIN_PORT: Env.schema.number(),
  DRIVE_DISK: Env.schema.enum(['s3'] as const),
  S3_BUCKET_OVH_ACCESS_KEY_ID: Env.schema.string(),
  S3_BUCKET_OVH_SECRET_ACCESS_KEY: Env.schema.string(),
  S3_BUCKET_OVH_REGION: Env.schema.string(),
  S3_BUCKET_OVH_NAME: Env.schema.string(),
  S3_BUCKET_OVH_VISIBILITY: Env.schema.enum(['public', 'private'] as const),
  S3_BUCKET_OVH_ENDPOINT: Env.schema.string(),
  S3_BUCKET_OVH_LIST_FILES_GAMECLIENT_AETHER_ROYALE: Env.schema.string(),
  S3_BUCKET_OVH_SIGNED_URL_EXPIRES_SECONDS: Env.schema.number(),
})
