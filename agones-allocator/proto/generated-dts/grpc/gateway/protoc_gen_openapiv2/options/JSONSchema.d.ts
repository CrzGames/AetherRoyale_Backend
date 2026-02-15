import type { Value as _google_protobuf_Value, Value__Output as _google_protobuf_Value__Output } from '../../../../google/protobuf/Value';
import type { Long } from '@grpc/proto-loader';
/**
 * 'FieldConfiguration' provides additional field level properties used when generating the OpenAPI v2 file.
 * These properties are not defined by OpenAPIv2, but they are used to control the generation.
 */
export interface _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_FieldConfiguration {
    /**
     * Alternative parameter name when used as path parameter. If set, this will
     * be used as the complete parameter name when this field is used as a path
     * parameter. Use this to avoid having auto generated path parameter names
     * for overlapping paths.
     */
    'path_param_name'?: (string);
}
/**
 * 'FieldConfiguration' provides additional field level properties used when generating the OpenAPI v2 file.
 * These properties are not defined by OpenAPIv2, but they are used to control the generation.
 */
export interface _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_FieldConfiguration__Output {
    /**
     * Alternative parameter name when used as path parameter. If set, this will
     * be used as the complete parameter name when this field is used as a path
     * parameter. Use this to avoid having auto generated path parameter names
     * for overlapping paths.
     */
    'path_param_name': (string);
}
export declare const _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_JSONSchemaSimpleTypes: {
    readonly UNKNOWN: "UNKNOWN";
    readonly ARRAY: "ARRAY";
    readonly BOOLEAN: "BOOLEAN";
    readonly INTEGER: "INTEGER";
    readonly NULL: "NULL";
    readonly NUMBER: "NUMBER";
    readonly OBJECT: "OBJECT";
    readonly STRING: "STRING";
};
export type _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_JSONSchemaSimpleTypes = 'UNKNOWN' | 0 | 'ARRAY' | 1 | 'BOOLEAN' | 2 | 'INTEGER' | 3 | 'NULL' | 4 | 'NUMBER' | 5 | 'OBJECT' | 6 | 'STRING' | 7;
export type _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_JSONSchemaSimpleTypes__Output = typeof _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_JSONSchemaSimpleTypes[keyof typeof _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_JSONSchemaSimpleTypes];
/**
 * `JSONSchema` represents properties from JSON Schema taken, and as used, in
 * the OpenAPI v2 spec.
 *
 * This includes changes made by OpenAPI v2.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 *
 * See also: https://cswr.github.io/JsonSchema/spec/basic_types/,
 * https://github.com/json-schema-org/json-schema-spec/blob/master/schema.json
 *
 * Example:
 *
 * message SimpleMessage {
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema) = {
 * json_schema: {
 * title: "SimpleMessage"
 * description: "A simple message."
 * required: ["id"]
 * }
 * };
 *
 * // Id represents the message identifier.
 * string id = 1; [
 * (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_field) = {
 * description: "The unique identifier of the simple message."
 * }];
 * }
 */
export interface JSONSchema {
    /**
     * Ref is used to define an external reference to include in the message.
     * This could be a fully qualified proto message reference, and that type must
     * be imported into the protofile. If no message is identified, the Ref will
     * be used verbatim in the output.
     * For example:
     * `ref: ".google.protobuf.Timestamp"`.
     */
    'ref'?: (string);
    /**
     * The title of the schema.
     */
    'title'?: (string);
    /**
     * A short description of the schema.
     */
    'description'?: (string);
    'default'?: (string);
    'read_only'?: (boolean);
    /**
     * A free-form property to include a JSON example of this field. This is copied
     * verbatim to the output swagger.json. Quotes must be escaped.
     * This property is the same for 2.0 and 3.0.0 https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/3.0.0.md#schemaObject  https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
     */
    'example'?: (string);
    'multiple_of'?: (number | string);
    /**
     * Maximum represents an inclusive upper limit for a numeric instance. The
     * value of MUST be a number,
     */
    'maximum'?: (number | string);
    'exclusive_maximum'?: (boolean);
    /**
     * minimum represents an inclusive lower limit for a numeric instance. The
     * value of MUST be a number,
     */
    'minimum'?: (number | string);
    'exclusive_minimum'?: (boolean);
    'max_length'?: (number | string | Long);
    'min_length'?: (number | string | Long);
    'pattern'?: (string);
    'max_items'?: (number | string | Long);
    'min_items'?: (number | string | Long);
    'unique_items'?: (boolean);
    'max_properties'?: (number | string | Long);
    'min_properties'?: (number | string | Long);
    'required'?: (string)[];
    /**
     * Items in 'array' must be unique.
     */
    'array'?: (string)[];
    'type'?: (_grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_JSONSchemaSimpleTypes)[];
    /**
     * `Format`
     */
    'format'?: (string);
    /**
     * Items in `enum` must be unique https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1
     */
    'enum'?: (string)[];
    'extensions'?: ({
        [key: string]: _google_protobuf_Value;
    });
    /**
     * Additional field level properties used when generating the OpenAPI v2 file.
     */
    'field_configuration'?: (_grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_FieldConfiguration | null);
}
/**
 * `JSONSchema` represents properties from JSON Schema taken, and as used, in
 * the OpenAPI v2 spec.
 *
 * This includes changes made by OpenAPI v2.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 *
 * See also: https://cswr.github.io/JsonSchema/spec/basic_types/,
 * https://github.com/json-schema-org/json-schema-spec/blob/master/schema.json
 *
 * Example:
 *
 * message SimpleMessage {
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema) = {
 * json_schema: {
 * title: "SimpleMessage"
 * description: "A simple message."
 * required: ["id"]
 * }
 * };
 *
 * // Id represents the message identifier.
 * string id = 1; [
 * (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_field) = {
 * description: "The unique identifier of the simple message."
 * }];
 * }
 */
export interface JSONSchema__Output {
    /**
     * Ref is used to define an external reference to include in the message.
     * This could be a fully qualified proto message reference, and that type must
     * be imported into the protofile. If no message is identified, the Ref will
     * be used verbatim in the output.
     * For example:
     * `ref: ".google.protobuf.Timestamp"`.
     */
    'ref': (string);
    /**
     * The title of the schema.
     */
    'title': (string);
    /**
     * A short description of the schema.
     */
    'description': (string);
    'default': (string);
    'read_only': (boolean);
    /**
     * A free-form property to include a JSON example of this field. This is copied
     * verbatim to the output swagger.json. Quotes must be escaped.
     * This property is the same for 2.0 and 3.0.0 https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/3.0.0.md#schemaObject  https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
     */
    'example': (string);
    'multiple_of': (number);
    /**
     * Maximum represents an inclusive upper limit for a numeric instance. The
     * value of MUST be a number,
     */
    'maximum': (number);
    'exclusive_maximum': (boolean);
    /**
     * minimum represents an inclusive lower limit for a numeric instance. The
     * value of MUST be a number,
     */
    'minimum': (number);
    'exclusive_minimum': (boolean);
    'max_length': (string);
    'min_length': (string);
    'pattern': (string);
    'max_items': (string);
    'min_items': (string);
    'unique_items': (boolean);
    'max_properties': (string);
    'min_properties': (string);
    'required': (string)[];
    /**
     * Items in 'array' must be unique.
     */
    'array': (string)[];
    'type': (_grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_JSONSchemaSimpleTypes__Output)[];
    /**
     * `Format`
     */
    'format': (string);
    /**
     * Items in `enum` must be unique https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1
     */
    'enum': (string)[];
    'extensions': ({
        [key: string]: _google_protobuf_Value__Output;
    });
    /**
     * Additional field level properties used when generating the OpenAPI v2 file.
     */
    'field_configuration': (_grpc_gateway_protoc_gen_openapiv2_options_JSONSchema_FieldConfiguration__Output | null);
}
