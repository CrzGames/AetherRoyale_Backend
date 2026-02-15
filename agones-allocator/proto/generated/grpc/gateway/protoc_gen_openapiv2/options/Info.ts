// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto

import type { Contact as _grpc_gateway_protoc_gen_openapiv2_options_Contact, Contact__Output as _grpc_gateway_protoc_gen_openapiv2_options_Contact__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/Contact';
import type { License as _grpc_gateway_protoc_gen_openapiv2_options_License, License__Output as _grpc_gateway_protoc_gen_openapiv2_options_License__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/License';
import type { Value as _google_protobuf_Value, Value__Output as _google_protobuf_Value__Output } from '../../../../google/protobuf/Value';

/**
 * `Info` is a representation of OpenAPI v2 specification's Info object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#infoObject
 * 
 * Example:
 * 
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 * info: {
 * title: "Echo API";
 * version: "1.0";
 * description: "";
 * contact: {
 * name: "gRPC-Gateway project";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway";
 * email: "none@example.com";
 * };
 * license: {
 * name: "BSD 3-Clause License";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 * };
 * };
 * ...
 * };
 */
export interface Info {
  /**
   * The title of the application.
   */
  'title'?: (string);
  /**
   * A short description of the application. GFM syntax can be used for rich
   * text representation.
   */
  'description'?: (string);
  /**
   * The Terms of Service for the API.
   */
  'terms_of_service'?: (string);
  /**
   * The contact information for the exposed API.
   */
  'contact'?: (_grpc_gateway_protoc_gen_openapiv2_options_Contact | null);
  /**
   * The license information for the exposed API.
   */
  'license'?: (_grpc_gateway_protoc_gen_openapiv2_options_License | null);
  /**
   * Provides the version of the application API (not to be confused
   * with the specification version).
   */
  'version'?: (string);
  'extensions'?: ({[key: string]: _google_protobuf_Value});
}

/**
 * `Info` is a representation of OpenAPI v2 specification's Info object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#infoObject
 * 
 * Example:
 * 
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 * info: {
 * title: "Echo API";
 * version: "1.0";
 * description: "";
 * contact: {
 * name: "gRPC-Gateway project";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway";
 * email: "none@example.com";
 * };
 * license: {
 * name: "BSD 3-Clause License";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 * };
 * };
 * ...
 * };
 */
export interface Info__Output {
  /**
   * The title of the application.
   */
  'title': (string);
  /**
   * A short description of the application. GFM syntax can be used for rich
   * text representation.
   */
  'description': (string);
  /**
   * The Terms of Service for the API.
   */
  'terms_of_service': (string);
  /**
   * The contact information for the exposed API.
   */
  'contact': (_grpc_gateway_protoc_gen_openapiv2_options_Contact__Output | null);
  /**
   * The license information for the exposed API.
   */
  'license': (_grpc_gateway_protoc_gen_openapiv2_options_License__Output | null);
  /**
   * Provides the version of the application API (not to be confused
   * with the specification version).
   */
  'version': (string);
  'extensions': ({[key: string]: _google_protobuf_Value__Output});
}
