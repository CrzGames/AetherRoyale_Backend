// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto


/**
 * `ExternalDocumentation` is a representation of OpenAPI v2 specification's
 * ExternalDocumentation object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#externalDocumentationObject
 * 
 * Example:
 * 
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 * ...
 * external_docs: {
 * description: "More about gRPC-Gateway";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway";
 * }
 * ...
 * };
 */
export interface ExternalDocumentation {
  /**
   * A short description of the target documentation. GFM syntax can be used for
   * rich text representation.
   */
  'description'?: (string);
  /**
   * The URL for the target documentation. Value MUST be in the format
   * of a URL.
   */
  'url'?: (string);
}

/**
 * `ExternalDocumentation` is a representation of OpenAPI v2 specification's
 * ExternalDocumentation object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#externalDocumentationObject
 * 
 * Example:
 * 
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 * ...
 * external_docs: {
 * description: "More about gRPC-Gateway";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway";
 * }
 * ...
 * };
 */
export interface ExternalDocumentation__Output {
  /**
   * A short description of the target documentation. GFM syntax can be used for
   * rich text representation.
   */
  'description': (string);
  /**
   * The URL for the target documentation. Value MUST be in the format
   * of a URL.
   */
  'url': (string);
}
