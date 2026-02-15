import type { Info as _grpc_gateway_protoc_gen_openapiv2_options_Info, Info__Output as _grpc_gateway_protoc_gen_openapiv2_options_Info__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/Info';
import type { Scheme as _grpc_gateway_protoc_gen_openapiv2_options_Scheme, Scheme__Output as _grpc_gateway_protoc_gen_openapiv2_options_Scheme__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/Scheme';
import type { Response as _grpc_gateway_protoc_gen_openapiv2_options_Response, Response__Output as _grpc_gateway_protoc_gen_openapiv2_options_Response__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/Response';
import type { SecurityDefinitions as _grpc_gateway_protoc_gen_openapiv2_options_SecurityDefinitions, SecurityDefinitions__Output as _grpc_gateway_protoc_gen_openapiv2_options_SecurityDefinitions__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/SecurityDefinitions';
import type { SecurityRequirement as _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement, SecurityRequirement__Output as _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/SecurityRequirement';
import type { ExternalDocumentation as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation, ExternalDocumentation__Output as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/ExternalDocumentation';
import type { Value as _google_protobuf_Value, Value__Output as _google_protobuf_Value__Output } from '../../../../google/protobuf/Value';
/**
 * `Swagger` is a representation of OpenAPI v2 specification's Swagger object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#swaggerObject
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
 * schemes: HTTPS;
 * consumes: "application/json";
 * produces: "application/json";
 * };
 */
export interface Swagger {
    /**
     * Specifies the OpenAPI Specification version being used. It can be
     * used by the OpenAPI UI and other clients to interpret the API listing. The
     * value MUST be "2.0".
     */
    'swagger'?: (string);
    /**
     * Provides metadata about the API. The metadata can be used by the
     * clients if needed.
     */
    'info'?: (_grpc_gateway_protoc_gen_openapiv2_options_Info | null);
    /**
     * The host (name or ip) serving the API. This MUST be the host only and does
     * not include the scheme nor sub-paths. It MAY include a port. If the host is
     * not included, the host serving the documentation is to be used (including
     * the port). The host does not support path templating.
     */
    'host'?: (string);
    /**
     * The base path on which the API is served, which is relative to the host. If
     * it is not included, the API is served directly under the host. The value
     * MUST start with a leading slash (/). The basePath does not support path
     * templating.
     * Note that using `base_path` does not change the endpoint paths that are
     * generated in the resulting OpenAPI file. If you wish to use `base_path`
     * with relatively generated OpenAPI paths, the `base_path` prefix must be
     * manually removed from your `google.api.http` paths and your code changed to
     * serve the API from the `base_path`.
     */
    'base_path'?: (string);
    /**
     * The transfer protocol of the API. Values MUST be from the list: "http",
     * "https", "ws", "wss". If the schemes is not included, the default scheme to
     * be used is the one used to access the OpenAPI definition itself.
     */
    'schemes'?: (_grpc_gateway_protoc_gen_openapiv2_options_Scheme)[];
    /**
     * A list of MIME types the APIs can consume. This is global to all APIs but
     * can be overridden on specific API calls. Value MUST be as described under
     * Mime Types.
     */
    'consumes'?: (string)[];
    /**
     * A list of MIME types the APIs can produce. This is global to all APIs but
     * can be overridden on specific API calls. Value MUST be as described under
     * Mime Types.
     */
    'produces'?: (string)[];
    /**
     * An object to hold responses that can be used across operations. This
     * property does not define global responses for all operations.
     */
    'responses'?: ({
        [key: string]: _grpc_gateway_protoc_gen_openapiv2_options_Response;
    });
    /**
     * Security scheme definitions that can be used across the specification.
     */
    'security_definitions'?: (_grpc_gateway_protoc_gen_openapiv2_options_SecurityDefinitions | null);
    /**
     * A declaration of which security schemes are applied for the API as a whole.
     * The list of values describes alternative security schemes that can be used
     * (that is, there is a logical OR between the security requirements).
     * Individual operations can override this definition.
     */
    'security'?: (_grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement)[];
    /**
     * Additional external documentation.
     */
    'external_docs'?: (_grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation | null);
    'extensions'?: ({
        [key: string]: _google_protobuf_Value;
    });
}
/**
 * `Swagger` is a representation of OpenAPI v2 specification's Swagger object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#swaggerObject
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
 * schemes: HTTPS;
 * consumes: "application/json";
 * produces: "application/json";
 * };
 */
export interface Swagger__Output {
    /**
     * Specifies the OpenAPI Specification version being used. It can be
     * used by the OpenAPI UI and other clients to interpret the API listing. The
     * value MUST be "2.0".
     */
    'swagger': (string);
    /**
     * Provides metadata about the API. The metadata can be used by the
     * clients if needed.
     */
    'info': (_grpc_gateway_protoc_gen_openapiv2_options_Info__Output | null);
    /**
     * The host (name or ip) serving the API. This MUST be the host only and does
     * not include the scheme nor sub-paths. It MAY include a port. If the host is
     * not included, the host serving the documentation is to be used (including
     * the port). The host does not support path templating.
     */
    'host': (string);
    /**
     * The base path on which the API is served, which is relative to the host. If
     * it is not included, the API is served directly under the host. The value
     * MUST start with a leading slash (/). The basePath does not support path
     * templating.
     * Note that using `base_path` does not change the endpoint paths that are
     * generated in the resulting OpenAPI file. If you wish to use `base_path`
     * with relatively generated OpenAPI paths, the `base_path` prefix must be
     * manually removed from your `google.api.http` paths and your code changed to
     * serve the API from the `base_path`.
     */
    'base_path': (string);
    /**
     * The transfer protocol of the API. Values MUST be from the list: "http",
     * "https", "ws", "wss". If the schemes is not included, the default scheme to
     * be used is the one used to access the OpenAPI definition itself.
     */
    'schemes': (_grpc_gateway_protoc_gen_openapiv2_options_Scheme__Output)[];
    /**
     * A list of MIME types the APIs can consume. This is global to all APIs but
     * can be overridden on specific API calls. Value MUST be as described under
     * Mime Types.
     */
    'consumes': (string)[];
    /**
     * A list of MIME types the APIs can produce. This is global to all APIs but
     * can be overridden on specific API calls. Value MUST be as described under
     * Mime Types.
     */
    'produces': (string)[];
    /**
     * An object to hold responses that can be used across operations. This
     * property does not define global responses for all operations.
     */
    'responses': ({
        [key: string]: _grpc_gateway_protoc_gen_openapiv2_options_Response__Output;
    });
    /**
     * Security scheme definitions that can be used across the specification.
     */
    'security_definitions': (_grpc_gateway_protoc_gen_openapiv2_options_SecurityDefinitions__Output | null);
    /**
     * A declaration of which security schemes are applied for the API as a whole.
     * The list of values describes alternative security schemes that can be used
     * (that is, there is a logical OR between the security requirements).
     * Individual operations can override this definition.
     */
    'security': (_grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement__Output)[];
    /**
     * Additional external documentation.
     */
    'external_docs': (_grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output | null);
    'extensions': ({
        [key: string]: _google_protobuf_Value__Output;
    });
}
