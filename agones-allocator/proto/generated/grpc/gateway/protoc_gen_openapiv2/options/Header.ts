// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/grpc-gateway/protoc-gen-openapiv2/options/openapiv2.proto


/**
 * `Header` is a representation of OpenAPI v2 specification's Header object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#headerObject
 */
export interface Header {
  /**
   * `Description` is a short description of the header.
   */
  'description'?: (string);
  /**
   * The type of the object. The value MUST be one of "string", "number", "integer", or "boolean". The "array" type is not supported.
   */
  'type'?: (string);
  /**
   * `Format` The extending format for the previously mentioned type.
   */
  'format'?: (string);
  /**
   * `Default` Declares the value of the header that the server will use if none is provided.
   * See: https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2.
   * Unlike JSON Schema this value MUST conform to the defined type for the header.
   */
  'default'?: (string);
  /**
   * 'Pattern' See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.
   */
  'pattern'?: (string);
}

/**
 * `Header` is a representation of OpenAPI v2 specification's Header object.
 * 
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#headerObject
 */
export interface Header__Output {
  /**
   * `Description` is a short description of the header.
   */
  'description': (string);
  /**
   * The type of the object. The value MUST be one of "string", "number", "integer", or "boolean". The "array" type is not supported.
   */
  'type': (string);
  /**
   * `Format` The extending format for the previously mentioned type.
   */
  'format': (string);
  /**
   * `Default` Declares the value of the header that the server will use if none is provided.
   * See: https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2.
   * Unlike JSON Schema this value MUST conform to the defined type for the header.
   */
  'default': (string);
  /**
   * 'Pattern' See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.
   */
  'pattern': (string);
}
