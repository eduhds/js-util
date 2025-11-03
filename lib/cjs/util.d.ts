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
