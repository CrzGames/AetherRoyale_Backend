import type { Schema as _grpc_gateway_protoc_gen_openapiv2_options_Schema, Schema__Output as _grpc_gateway_protoc_gen_openapiv2_options_Schema__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/Schema';
import type { Header as _grpc_gateway_protoc_gen_openapiv2_options_Header, Header__Output as _grpc_gateway_protoc_gen_openapiv2_options_Header__Output } from '../../../../grpc/gateway/protoc_gen_openapiv2/options/Header';
import type { Value as _google_protobuf_Value, Value__Output as _google_protobuf_Value__Output } from '../../../../google/protobuf/Value';
/**
 * `Response` is a representation of OpenAPI v2 specification's Response object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#responseObject
 */
export interface Response {
    /**
     * `Description` is a short description of the response.
     * GFM syntax can be used for rich text representation.
     */
    'description'?: (string);
    /**
     * `Schema` optionally defines the structure of the response.
     * If `Schema` is not provided, it means there is no content to the response.
     */
    'schema'?: (_grpc_gateway_protoc_gen_openapiv2_options_Schema | null);
    /**
     * `Headers` A list of headers that are sent with the response.
     * `Header` name is expected to be a string in the canonical format of the MIME header key
     * See: https://golang.org/pkg/net/textproto/#CanonicalMIMEHeaderKey
     */
    'headers'?: ({
        [key: string]: _grpc_gateway_protoc_gen_openapiv2_options_Header;
    });
    /**
     * `Examples` gives per-mimetype response examples.
     * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#example-object
     */
    'examples'?: ({
        [key: string]: string;
    });
    'extensions'?: ({
        [key: string]: _google_protobuf_Value;
    });
}
/**
 * `Response` is a representation of OpenAPI v2 specification's Response object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#responseObject
 */
export interface Response__Output {
    /**
     * `Description` is a short description of the response.
     * GFM syntax can be used for rich text representation.
     */
    'description': (string);
    /**
     * `Schema` optionally defines the structure of the response.
     * If `Schema` is not provided, it means there is no content to the response.
     */
    'schema': (_grpc_gateway_protoc_gen_openapiv2_options_Schema__Output | null);
    /**
     * `Headers` A list of headers that are sent with the response.
     * `Header` name is expected to be a string in the canonical format of the MIME header key
     * See: https://golang.org/pkg/net/textproto/#CanonicalMIMEHeaderKey
     */
    'headers': ({
        [key: string]: _grpc_gateway_protoc_gen_openapiv2_options_Header__Output;
    });
    /**
     * `Examples` gives per-mimetype response examples.
     * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#example-object
     */
    'examples': ({
        [key: string]: string;
    });
    'extensions': ({
        [key: string]: _google_protobuf_Value__Output;
    });
}
