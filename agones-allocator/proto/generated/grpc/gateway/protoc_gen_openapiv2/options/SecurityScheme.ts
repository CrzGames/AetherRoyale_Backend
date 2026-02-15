// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto

import type { Scopes as _grpc_gateway_protoc_gen_openapiv2_options_Scopes, Scopes__Output as _grpc_gateway_protoc_gen_openapiv2_options_Scopes__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/Scopes';
import type { Value as _google_protobuf_Value, Value__Output as _google_protobuf_Value__Output } from '../../../../google/protobuf/Value';

// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto

/**
 * The flow used by the OAuth2 security scheme. Valid values are
 * "implicit", "password", "application" or "accessCode".
 */
export const _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Flow = {
  FLOW_INVALID: 'FLOW_INVALID',
  FLOW_IMPLICIT: 'FLOW_IMPLICIT',
  FLOW_PASSWORD: 'FLOW_PASSWORD',
  FLOW_APPLICATION: 'FLOW_APPLICATION',
  FLOW_ACCESS_CODE: 'FLOW_ACCESS_CODE',
} as const;

/**
 * The flow used by the OAuth2 security scheme. Valid values are
 * "implicit", "password", "application" or "accessCode".
 */
export type _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Flow =
  | 'FLOW_INVALID'
  | 0
  | 'FLOW_IMPLICIT'
  | 1
  | 'FLOW_PASSWORD'
  | 2
  | 'FLOW_APPLICATION'
  | 3
  | 'FLOW_ACCESS_CODE'
  | 4

/**
 * The flow used by the OAuth2 security scheme. Valid values are
 * "implicit", "password", "application" or "accessCode".
 */
export type _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Flow__Output = typeof _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Flow[keyof typeof _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Flow]

// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto

/**
 * The location of the API key. Valid values are "query" or "header".
 */
export const _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_In = {
  IN_INVALID: 'IN_INVALID',
  IN_QUERY: 'IN_QUERY',
  IN_HEADER: 'IN_HEADER',
} as const;

/**
 * The location of the API key. Valid values are "query" or "header".
 */
export type _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_In =
  | 'IN_INVALID'
  | 0
  | 'IN_QUERY'
  | 1
  | 'IN_HEADER'
  | 2

/**
 * The location of the API key. Valid values are "query" or "header".
 */
export type _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_In__Output = typeof _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_In[keyof typeof _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_In]

// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto

/**
 * The type of the security scheme. Valid values are "basic",
 * "apiKey" or "oauth2".
 */
export const _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Type = {
  TYPE_INVALID: 'TYPE_INVALID',
  TYPE_BASIC: 'TYPE_BASIC',
  TYPE_API_KEY: 'TYPE_API_KEY',
  TYPE_OAUTH2: 'TYPE_OAUTH2',
} as const;

/**
 * The type of the security scheme. Valid values are "basic",
 * "apiKey" or "oauth2".
 */
export type _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Type =
  | 'TYPE_INVALID'
  | 0
  | 'TYPE_BASIC'
  | 1
  | 'TYPE_API_KEY'
  | 2
  | 'TYPE_OAUTH2'
  | 3

/**
 * The type of the security scheme. Valid values are "basic",
 * "apiKey" or "oauth2".
 */
export type _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Type__Output = typeof _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Type[keyof typeof _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Type]

/**
 * `SecurityScheme` is a representation of OpenAPI v2 specification's
 * Security Scheme object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securitySchemeObject
 * 
 * Allows the definition of a security scheme that can be used by the
 * operations. Supported schemes are basic authentication, an API key (either as
 * a header or as a query parameter) and OAuth2's common flows (implicit,
 * password, application and access code).
 */
export interface SecurityScheme {
  /**
   * The type of the security scheme. Valid values are "basic",
   * "apiKey" or "oauth2".
   */
  'type'?: (_grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Type);
  /**
   * A short description for security scheme.
   */
  'description'?: (string);
  /**
   * The name of the header or query parameter to be used.
   * Valid for apiKey.
   */
  'name'?: (string);
  /**
   * The location of the API key. Valid values are "query" or
   * "header".
   * Valid for apiKey.
   */
  'in'?: (_grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_In);
  /**
   * The flow used by the OAuth2 security scheme. Valid values are
   * "implicit", "password", "application" or "accessCode".
   * Valid for oauth2.
   */
  'flow'?: (_grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Flow);
  /**
   * The authorization URL to be used for this flow. This SHOULD be in
   * the form of a URL.
   * Valid for oauth2/implicit and oauth2/accessCode.
   */
  'authorization_url'?: (string);
  /**
   * The token URL to be used for this flow. This SHOULD be in the
   * form of a URL.
   * Valid for oauth2/password, oauth2/application and oauth2/accessCode.
   */
  'token_url'?: (string);
  /**
   * The available scopes for the OAuth2 security scheme.
   * Valid for oauth2.
   */
  'scopes'?: (_grpc_gateway_protoc_gen_openapiv2_options_Scopes | null);
  'extensions'?: ({[key: string]: _google_protobuf_Value});
}

/**
 * `SecurityScheme` is a representation of OpenAPI v2 specification's
 * Security Scheme object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securitySchemeObject
 * 
 * Allows the definition of a security scheme that can be used by the
 * operations. Supported schemes are basic authentication, an API key (either as
 * a header or as a query parameter) and OAuth2's common flows (implicit,
 * password, application and access code).
 */
export interface SecurityScheme__Output {
  /**
   * The type of the security scheme. Valid values are "basic",
   * "apiKey" or "oauth2".
   */
  'type': (_grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Type__Output);
  /**
   * A short description for security scheme.
   */
  'description': (string);
  /**
   * The name of the header or query parameter to be used.
   * Valid for apiKey.
   */
  'name': (string);
  /**
   * The location of the API key. Valid values are "query" or
   * "header".
   * Valid for apiKey.
   */
  'in': (_grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_In__Output);
  /**
   * The flow used by the OAuth2 security scheme. Valid values are
   * "implicit", "password", "application" or "accessCode".
   * Valid for oauth2.
   */
  'flow': (_grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme_Flow__Output);
  /**
   * The authorization URL to be used for this flow. This SHOULD be in
   * the form of a URL.
   * Valid for oauth2/implicit and oauth2/accessCode.
   */
  'authorization_url': (string);
  /**
   * The token URL to be used for this flow. This SHOULD be in the
   * form of a URL.
   * Valid for oauth2/password, oauth2/application and oauth2/accessCode.
   */
  'token_url': (string);
  /**
   * The available scopes for the OAuth2 security scheme.
   * Valid for oauth2.
   */
  'scopes': (_grpc_gateway_protoc_gen_openapiv2_options_Scopes__Output | null);
  'extensions': ({[key: string]: _google_protobuf_Value__Output});
}
