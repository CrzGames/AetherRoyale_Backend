import type { SecurityScheme as _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme, SecurityScheme__Output as _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/SecurityScheme';
/**
 * `SecurityDefinitions` is a representation of OpenAPI v2 specification's
 * Security Definitions object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityDefinitionsObject
 *
 * A declaration of the security schemes available to be used in the
 * specification. This does not enforce the security schemes on the operations
 * and only serves to provide the relevant details for each scheme.
 */
export interface SecurityDefinitions {
    /**
     * A single security scheme definition, mapping a "name" to the scheme it
     * defines.
     */
    'security'?: ({
        [key: string]: _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme;
    });
}
/**
 * `SecurityDefinitions` is a representation of OpenAPI v2 specification's
 * Security Definitions object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityDefinitionsObject
 *
 * A declaration of the security schemes available to be used in the
 * specification. This does not enforce the security schemes on the operations
 * and only serves to provide the relevant details for each scheme.
 */
export interface SecurityDefinitions__Output {
    /**
     * A single security scheme definition, mapping a "name" to the scheme it
     * defines.
     */
    'security': ({
        [key: string]: _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme__Output;
    });
}
