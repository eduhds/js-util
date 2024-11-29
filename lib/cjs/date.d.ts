/**
 * Timestamp em UNIX Epoch
 */
export declare function getUnixEpochTimestamp(): number;
/**
 * Conversão de UNIX Epoch
 */
export declare function convertTimestampFromUnixEpoch(unixEpochTimestamp: number): number;
/**
 * Format Date object to Brazil date format DD/MM/YYYY
 * @example
 * // returns '12/12/2012'
 * formatDateBR(new Date(2012, 11, 12))
 */
export declare function formatDateBR(date: Date): string;
/**
 * Format Date object to Brazil time format HH:MM:SS
 * @example
 * // returns '12:12'
 * formatTimeBR(new Date(2012, 11, 12, 12, 12, 12))
 * // returns '12:12:12'
 * formatTimeBR(new Date(2012, 11, 12, 12, 12, 12), true)
 */
export declare function formatTimeBR(date: Date, seconds?: boolean): string;
