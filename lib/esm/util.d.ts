import { SplitCharacter } from './@types/object';
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
    _headers?: Record<string, string> | undefined;
    _baseUrl?: string | undefined;
    _protocol?: string | undefined;
    _domain?: string | undefined;
    _body: any;
    _query?: Record<string, string | number | boolean | null | undefined> | undefined;
    _params?: Record<`$${string}`, string> | undefined;
    _paths?: readonly string[] | undefined;
    _config?: Omit<RequestInit, "body" | "method" | "headers"> | undefined;
    "__#1@#endpoint": string;
    body(body: any): any;
    config(config: Omit<RequestInit, "body" | "method" | "headers">): any;
    headers(...keyValuePairs: [string, string][]): any;
    request(method: string): Promise<Response>;
    routes<T extends readonly string[], S extends SplitCharacter = "/">(paths: readonly [...T], separator?: S): import("./@types/object").DeepMerge<import("./@types/object").MergeAll<{ [I in keyof T]: import("./@types/object").SegmentsToObject<T[I], import("./@types/object").Separator<S>, any>; }>, unknown>;
    url(url: string, ...parameters: [`$${string}`, string][]): any;
    get(...parameters: [`$${string}`, string][]): Promise<Response>;
    post(...parameters: [`$${string}`, string][]): Promise<Response>;
    put(...parameters: [`$${string}`, string][]): Promise<Response>;
    patch(...parameters: [`$${string}`, string][]): Promise<Response>;
    delete(...parameters: [`$${string}`, string][]): Promise<Response>;
};
/**
 * Gera um UUID v4
 *
 * Importante:
 *
 * Math.random() não é seguro do ponto de vista criptográfico: é previsível.
 * Se o uuid for usado para algo sensível (ex.: associar sessão, evitar replay, validação de segurança),
 * essa implementação não é confiável e não deveria ser usada.
 *
 * @example
 * // returns uuid like "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
 * generateUUID();
 */
export declare function generateUUID(): string;
