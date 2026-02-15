import type { ExternalDocumentation as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation, ExternalDocumentation__Output as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/ExternalDocumentation';
import type { Response as _grpc_gateway_protoc_gen_openapiv2_options_Response, Response__Output as _grpc_gateway_protoc_gen_openapiv2_options_Response__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/Response';
import type { Scheme as _grpc_gateway_protoc_gen_openapiv2_options_Scheme, Scheme__Output as _grpc_gateway_protoc_gen_openapiv2_options_Scheme__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/Scheme';
import type { SecurityRequirement as _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement, SecurityRequirement__Output as _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/SecurityRequirement';
import type { Value as _google_protobuf_Value, Value__Output as _google_protobuf_Value__Output } from '../../../../google/protobuf/Value';
/**
 * `Operation` is a representation of OpenAPI v2 specification's Operation object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#operationObject
 *
 * Example:
 *
 * service EchoService {
 * rpc Echo(SimpleMessage) returns (SimpleMessage) {
 * option (google.api.http) = {
 * get: "/v1/example/echo/{id}"
 * };
 *
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
 * summary: "Get a message.";
 * operation_id: "getMessage";
 * tags: "echo";
 * responses: {
 * key: "200"
 * value: {
 * description: "OK";
 * }
 * }
 * };
 * }
 * }
 */
export interface Operation {
    /**
     * A list of tags for API documentation control. Tags can be used for logical
     * grouping of operations by resources or any other qualifier.
     */
    'tags'?: (string)[];
    /**
     * A short summary of what the operation does. For maximum readability in the
     * swagger-ui, this field SHOULD be less than 120 characters.
     */
    'summary'?: (string);
    /**
     * A verbose explanation of the operation behavior. GFM syntax can be used for
     * rich text representation.
     */
    'description'?: (string);
    /**
     * Additional external documentation for this operation.
     */
    'external_docs'?: (_grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation | null);
    /**
     * Unique string used to identify the operation. The id MUST be unique among
     * all operations described in the API. Tools and libraries MAY use the
     * operationId to uniquely identify an operation, therefore, it is recommended
     * to follow common programming naming conventions.
     */
    'operation_id'?: (string);
    /**
     * A list of MIME types the operation can consume. This overrides the consumes
     * definition at the OpenAPI Object. An empty value MAY be used to clear the
     * global definition. Value MUST be as described under Mime Types.
     */
    'consumes'?: (string)[];
    /**
     * A list of MIME types the operation can produce. This overrides the produces
     * definition at the OpenAPI Object. An empty value MAY be used to clear the
     * global definition. Value MUST be as described under Mime Types.
     */
    'produces'?: (string)[];
    /**
     * The list of possible responses as they are returned from executing this
     * operation.
     */
    'responses'?: ({
        [key: string]: _grpc_gateway_protoc_gen_openapiv2_options_Response;
    });
    /**
     * The transfer protocol for the operation. Values MUST be from the list:
     * "http", "https", "ws", "wss". The value overrides the OpenAPI Object
     * schemes definition.
     */
    'schemes'?: (_grpc_gateway_protoc_gen_openapiv2_options_Scheme)[];
    /**
     * Declares this operation to be deprecated. Usage of the declared operation
     * should be refrained. Default value is false.
     */
    'deprecated'?: (boolean);
    /**
     * A declaration of which security schemes are applied for this operation. The
     * list of values describes alternative security schemes that can be used
     * (that is, there is a logical OR between the security requirements). This
     * definition overrides any declared top-level security. To remove a top-level
     * security declaration, an empty array can be used.
     */
    'security'?: (_grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement)[];
    'extensions'?: ({
        [key: string]: _google_protobuf_Value;
    });
}
/**
 * `Operation` is a representation of OpenAPI v2 specification's Operation object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#operationObject
 *
 * Example:
 *
 * service EchoService {
 * rpc Echo(SimpleMessage) returns (SimpleMessage) {
 * option (google.api.http) = {
 * get: "/v1/example/echo/{id}"
 * };
 *
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
 * summary: "Get a message.";
 * operation_id: "getMessage";
 * tags: "echo";
 * responses: {
 * key: "200"
 * value: {
 * description: "OK";
 * }
 * }
 * };
 * }
 * }
 */
export interface Operation__Output {
    /**
     * A list of tags for API documentation control. Tags can be used for logical
     * grouping of operations by resources or any other qualifier.
     */
    'tags': (string)[];
    /**
     * A short summary of what the operation does. For maximum readability in the
     * swagger-ui, this field SHOULD be less than 120 characters.
     */
    'summary': (string);
    /**
     * A verbose explanation of the operation behavior. GFM syntax can be used for
     * rich text representation.
     */
    'description': (string);
    /**
     * Additional external documentation for this operation.
     */
    'external_docs': (_grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output | null);
    /**
     * Unique string used to identify the operation. The id MUST be unique among
     * all operations described in the API. Tools and libraries MAY use the
     * operationId to uniquely identify an operation, therefore, it is recommended
     * to follow common programming naming conventions.
     */
    'operation_id': (string);
    /**
     * A list of MIME types the operation can consume. This overrides the consumes
     * definition at the OpenAPI Object. An empty value MAY be used to clear the
     * global definition. Value MUST be as described under Mime Types.
     */
    'consumes': (string)[];
    /**
     * A list of MIME types the operation can produce. This overrides the produces
     * definition at the OpenAPI Object. An empty value MAY be used to clear the
     * global definition. Value MUST be as described under Mime Types.
     */
    'produces': (string)[];
    /**
     * The list of possible responses as they are returned from executing this
     * operation.
     */
    'responses': ({
        [key: string]: _grpc_gateway_protoc_gen_openapiv2_options_Response__Output;
    });
    /**
     * The transfer protocol for the operation. Values MUST be from the list:
     * "http", "https", "ws", "wss". The value overrides the OpenAPI Object
     * schemes definition.
     */
    'schemes': (_grpc_gateway_protoc_gen_openapiv2_options_Scheme__Output)[];
    /**
     * Declares this operation to be deprecated. Usage of the declared operation
     * should be refrained. Default value is false.
     */
    'deprecated': (boolean);
    /**
     * A declaration of which security schemes are applied for this operation. The
     * list of values describes alternative security schemes that can be used
     * (that is, there is a logical OR between the security requirements). This
     * definition overrides any declared top-level security. To remove a top-level
     * security declaration, an empty array can be used.
     */
    'security': (_grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement__Output)[];
    'extensions': ({
        [key: string]: _google_protobuf_Value__Output;
    });
}
