/**
 * `License` is a representation of OpenAPI v2 specification's License object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#licenseObject
 *
 * Example:
 *
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 * info: {
 * ...
 * license: {
 * name: "BSD 3-Clause License";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 * };
 * ...
 * };
 * ...
 * };
 */
export interface License {
    /**
     * The license name used for the API.
     */
    'name'?: (string);
    /**
     * A URL to the license used for the API. MUST be in the format of a URL.
     */
    'url'?: (string);
}
/**
 * `License` is a representation of OpenAPI v2 specification's License object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#licenseObject
 *
 * Example:
 *
 * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 * info: {
 * ...
 * license: {
 * name: "BSD 3-Clause License";
 * url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 * };
 * ...
 * };
 * ...
 * };
 */
export interface License__Output {
    /**
     * The license name used for the API.
     */
    'name': (string);
    /**
     * A URL to the license used for the API. MUST be in the format of a URL.
     */
    'url': (string);
}
