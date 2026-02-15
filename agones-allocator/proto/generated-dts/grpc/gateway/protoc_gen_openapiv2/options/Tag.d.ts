import type { ExternalDocumentation as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation, ExternalDocumentation__Output as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/ExternalDocumentation';
/**
 * `Tag` is a representation of OpenAPI v2 specification's Tag object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#tagObject
 */
export interface Tag {
    /**
     * A short description for the tag. GFM syntax can be used for rich text
     * representation.
     */
    'description'?: (string);
    /**
     * Additional external documentation for this tag.
     */
    'external_docs'?: (_grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation | null);
}
/**
 * `Tag` is a representation of OpenAPI v2 specification's Tag object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#tagObject
 */
export interface Tag__Output {
    /**
     * A short description for the tag. GFM syntax can be used for rich text
     * representation.
     */
    'description': (string);
    /**
     * Additional external documentation for this tag.
     */
    'external_docs': (_grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output | null);
}
