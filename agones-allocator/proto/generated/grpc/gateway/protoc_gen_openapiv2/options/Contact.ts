// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto


/**
 * `Contact` is a representation of OpenAPI v2 specification's Contact object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#contactObject
 * 
 * Example:
 * 
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 * info: {
 * ...
 * contact: {
 * name: "gRPC-Gateway project";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway";
 * email: "none@example.com";
 * };
 * ...
 * };
 * ...
 * };
 */
export interface Contact {
  /**
   * The identifying name of the contact person/organization.
   */
  'name'?: (string);
  /**
   * The URL pointing to the contact information. MUST be in the format of a
   * URL.
   */
  'url'?: (string);
  /**
   * The email address of the contact person/organization. MUST be in the format
   * of an email address.
   */
  'email'?: (string);
}

/**
 * `Contact` is a representation of OpenAPI v2 specification's Contact object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#contactObject
 * 
 * Example:
 * 
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 * info: {
 * ...
 * contact: {
 * name: "gRPC-Gateway project";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway";
 * email: "none@example.com";
 * };
 * ...
 * };
 * ...
 * };
 */
export interface Contact__Output {
  /**
   * The identifying name of the contact person/organization.
   */
  'name': (string);
  /**
   * The URL pointing to the contact information. MUST be in the format of a
   * URL.
   */
  'url': (string);
  /**
   * The email address of the contact person/organization. MUST be in the format
   * of an email address.
   */
  'email': (string);
}
