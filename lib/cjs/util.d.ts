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
