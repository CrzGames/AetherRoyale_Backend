/**
 * Scheme describes the schemes supported by the OpenAPI Swagger
 * and Operation objects.
 */
export declare const Scheme: {
    readonly UNKNOWN: "UNKNOWN";
    readonly HTTP: "HTTP";
    readonly HTTPS: "HTTPS";
    readonly WS: "WS";
    readonly WSS: "WSS";
};
/**
 * Scheme describes the schemes supported by the OpenAPI Swagger
 * and Operation objects.
 */
export type Scheme = 'UNKNOWN' | 0 | 'HTTP' | 1 | 'HTTPS' | 2 | 'WS' | 3 | 'WSS' | 4;
/**
 * Scheme describes the schemes supported by the OpenAPI Swagger
 * and Operation objects.
 */
export type Scheme__Output = typeof Scheme[keyof typeof Scheme];
