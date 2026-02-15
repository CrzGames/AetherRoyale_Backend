// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto

/**
 * Scheme describes the schemes supported by the OpenAPI Swagger
 * and Operation objects.
 */
export const Scheme = {
  UNKNOWN: 'UNKNOWN',
  HTTP: 'HTTP',
  HTTPS: 'HTTPS',
  WS: 'WS',
  WSS: 'WSS',
} as const;

/**
 * Scheme describes the schemes supported by the OpenAPI Swagger
 * and Operation objects.
 */
export type Scheme =
  | 'UNKNOWN'
  | 0
  | 'HTTP'
  | 1
  | 'HTTPS'
  | 2
  | 'WS'
  | 3
  | 'WSS'
  | 4

/**
 * Scheme describes the schemes supported by the OpenAPI Swagger
 * and Operation objects.
 */
export type Scheme__Output = typeof Scheme[keyof typeof Scheme]
