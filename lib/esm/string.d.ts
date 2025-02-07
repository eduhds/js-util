/**
 * Format number as: 100000.00 to 100.000,00
 * @deprecated use `maskNumberDecimals` instead
 */
export declare function formatMoneyBR(value: number): string;
/**
 * Format Placa automotiva
 */
export declare function formatPlacaOld(value: string): string;
/**
 * Format text to lowercase and without special characters
 */
export declare function normalizeLower(text: string): string;
/**
 * Return text with first letter to uppercase
 * @example
 * // returns Lorem ipsum
 * capitalize('lorem ipsum')
 */
export declare function capitalize(text: string): string;
/**
 * Return text with all word first letter to uppercase
 * @example
 * // returns 'Lorem Ipsum Dolor Sit'
 * titleize('lorem ipsum dolor sit')
 */
export declare function titleize(text: string): string;
/**
 * Extract number from text
 */
export declare function numberFromText(text: string): number;
/**
 * Get file name from a file system path string
 */
export declare function fileNameFromPath(path: string): string;
/**
 * Get extension from file name string
 */
export declare function extensionFromFileName(fileName: string): string;
