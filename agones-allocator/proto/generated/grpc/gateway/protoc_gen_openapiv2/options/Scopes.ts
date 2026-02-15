// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto


/**
 * `Scopes` is a representation of OpenAPI v2 specification's Scopes object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#scopesObject
 * 
 * Lists the available scopes for an OAuth2 security scheme.
 */
export interface Scopes {
  /**
   * Maps between a name of a scope to a short description of it (as the value
   * of the property).
   */
  'scope'?: ({[key: string]: string});
}

/**
 * `Scopes` is a representation of OpenAPI v2 specification's Scopes object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#scopesObject
 * 
 * Lists the available scopes for an OAuth2 security scheme.
 */
export interface Scopes__Output {
  /**
   * Maps between a name of a scope to a short description of it (as the value
   * of the property).
   */
  'scope': ({[key: string]: string});
}
