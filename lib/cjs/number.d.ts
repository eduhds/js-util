/**
 * Parse number with flexible separators
 * @example
 * // returns 1
 * parseFlexibleNumber('1')
 * // returns -1
 * parseFlexibleNumber('-1')
 * // returns 1000000.5
 * parseFlexibleNumber('1.000.000,50')
 */
export declare function parseFlexibleNumber(str: string): number;
