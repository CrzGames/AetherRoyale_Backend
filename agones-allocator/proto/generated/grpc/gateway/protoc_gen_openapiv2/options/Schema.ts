// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto

import type { JSONSchema as _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema, JSONSchema__Output as _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/JSONSchema';
import type { ExternalDocumentation as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation, ExternalDocumentation__Output as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/ExternalDocumentation';

/**
 * `Schema` is a representation of OpenAPI v2 specification's Schema object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 */
export interface Schema {
  'json_schema'?: (_grpc_gateway_protoc_gen_openapiv2_options_JSONSchema | null);
  /**
   * Adds support for polymorphism. The discriminator is the schema property
   * name that is used to differentiate between other schema that inherit this
   * schema. The property name used MUST be defined at this schema and it MUST
   * be in the required property list. When used, the value MUST be the name of
   * this schema or any schema that inherits it.
   */
  'discriminator'?: (string);
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as
   * "read only". This means that it MAY be sent as part of a response but MUST
   * NOT be sent as part of the request. Properties marked as readOnly being
   * true SHOULD NOT be in the required list of the defined schema. Default
   * value is false.
   */
  'read_only'?: (boolean);
  /**
   * Additional external documentation for this schema.
   */
  'external_docs'?: (_grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation | null);
  /**
   * A free-form property to include an example of an instance for this schema in JSON.
   * This is copied verbatim to the output.
   */
  'example'?: (string);
}

/**
 * `Schema` is a representation of OpenAPI v2 specification's Schema object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 */
export interface Schema__Output {
  'json_schema': (_grpc_gateway_protoc_gen_openapiv2_options_JSONSchema__Output | null);
  /**
   * Adds support for polymorphism. The discriminator is the schema property
   * name that is used to differentiate between other schema that inherit this
   * schema. The property name used MUST be defined at this schema and it MUST
   * be in the required property list. When used, the value MUST be the name of
   * this schema or any schema that inherits it.
   */
  'discriminator': (string);
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as
   * "read only". This means that it MAY be sent as part of a response but MUST
   * NOT be sent as part of the request. Properties marked as readOnly being
   * true SHOULD NOT be in the required list of the defined schema. Default
   * value is false.
   */
  'read_only': (boolean);
  /**
   * Additional external documentation for this schema.
   */
  'external_docs': (_grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output | null);
  /**
   * A free-form property to include an example of an instance for this schema in JSON.
   * This is copied verbatim to the output.
   */
  'example': (string);
}
