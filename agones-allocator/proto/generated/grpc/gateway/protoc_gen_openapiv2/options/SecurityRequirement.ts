// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto


/**
 * If the security scheme is of type "oauth2", then the value is a list of
 * scope names required for the execution. For other security scheme types,
 * the array MUST be empty.
 */
export interface _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement_SecurityRequirementValue {
  'scope'?: (string)[];
}

/**
 * If the security scheme is of type "oauth2", then the value is a list of
 * scope names required for the execution. For other security scheme types,
 * the array MUST be empty.
 */
export interface _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement_SecurityRequirementValue__Output {
  'scope': (string)[];
}

/**
 * `SecurityRequirement` is a representation of OpenAPI v2 specification's
 * Security Requirement object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityRequirementObject
 * 
 * Lists the required security schemes to execute this operation. The object can
 * have multiple security schemes declared in it which are all required (that
 * is, there is a logical AND between the schemes).
 * 
 * The name used for each property MUST correspond to a security scheme
 * declared in the Security Definitions.
 */
export interface SecurityRequirement {
  /**
   * Each name must correspond to a security scheme which is declared in
   * the Security Definitions. If the security scheme is of type "oauth2",
   * then the value is a list of scope names required for the execution.
   * For other security scheme types, the array MUST be empty.
   */
  'security_requirement'?: ({[key: string]: _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement_SecurityRequirementValue});
}

/**
 * `SecurityRequirement` is a representation of OpenAPI v2 specification's
 * Security Requirement object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityRequirementObject
 * 
 * Lists the required security schemes to execute this operation. The object can
 * have multiple security schemes declared in it which are all required (that
 * is, there is a logical AND between the schemes).
 * 
 * The name used for each property MUST correspond to a security scheme
 * declared in the Security Definitions.
 */
export interface SecurityRequirement__Output {
  /**
   * Each name must correspond to a security scheme which is declared in
   * the Security Definitions. If the security scheme is of type "oauth2",
   * then the value is a list of scope names required for the execution.
   * For other security scheme types, the array MUST be empty.
   */
  'security_requirement': ({[key: string]: _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement_SecurityRequirementValue__Output});
}
