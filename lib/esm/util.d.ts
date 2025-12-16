/**
 * Transform bytes to size
 * @example
 * // returns 512,00 B
 * bytesToSize(512);
 */
export declare function bytesToSize(bytes: number): string;
/**
 * Get credit card brand
 * @example
 * // returns 'Visa'
 * getCreditCardBrand('4111111111111111');
 * // returns 'Mastercard'
 * getCreditCardBrand('5555555555554444');
 */
export declare function getCreditCardBrand(cardNumber: string): string;
/**
 * Get random hex color
 * @example
 * // returns #AABBCC (random color)
 * getRandomHexColor();
 */
export declare function getRandomHexColor(): string;
/**
 * Check if hex color is light
 * @example
 * // returns true
 * isColorLight('#FFFFFF');
 * // returns false
 * isColorLight('#000000');
 */
export declare function isColorLight(hex: string): boolean;
/**
 * Download file from blob
 * @example
 * // downloads file from blob
 * browserDownloadBlob(blob, 'file.pdf', 'application/pdf');
 */
export declare function browserDownloadBlob(data: number[] | string | Blob, fileName: string, mimeType: string): void;
/**
 * Create http client
 * @experimental
 */
export declare function http(): {
    _baseUrl: string;
    _protocol: string;
    _domain: string;
    _body: any;
    _headers: Record<string, string>;
    _query: Record<string, string | number | boolean | null | undefined>;
    _params: Record<`$${string}`, string>;
    _paths: readonly string[];
    url(url: string, ...parameters: [`$${string}`, string][]): any;
    headers(...keyValuePairs: [string, string][]): any;
    routes<T extends readonly string[]>(paths: readonly [...T]): import("./@types/object").DeepMerge<import("./@types/object").MergeAll<{ [I in keyof T]: T[I] extends infer T_1 ? T_1 extends T[I] ? T_1 extends `${infer H}/${infer R}` ? { [K in H]: R extends `${infer H}/${infer R}` ? any : { [K_1 in R]: {
        _body: any;
        _headers: Record<string, string>;
        _params: Record<`$${string}`, string>;
        body(body: any): any;
        headers(keyValuePairs: [string, string][]): any;
        get(...parameters: [`$${string}`, string][]): Promise<Response>;
        post(...parameters: [`$${string}`, string][]): Promise<Response>;
        put(...parameters: [`$${string}`, string][]): Promise<Response>;
        patch(...parameters: [`$${string}`, string][]): Promise<Response>;
        delete(...parameters: [`$${string}`, string][]): Promise<Response>;
    }; }; } : { [K_2 in T_1]: {
        _body: any;
        _headers: Record<string, string>;
        _params: Record<`$${string}`, string>;
        body(body: any): any;
        headers(keyValuePairs: [string, string][]): any;
        get(...parameters: [`$${string}`, string][]): Promise<Response>;
        post(...parameters: [`$${string}`, string][]): Promise<Response>;
        put(...parameters: [`$${string}`, string][]): Promise<Response>;
        patch(...parameters: [`$${string}`, string][]): Promise<Response>;
        delete(...parameters: [`$${string}`, string][]): Promise<Response>;
    }; } : never : never; }>, unknown>;
};
