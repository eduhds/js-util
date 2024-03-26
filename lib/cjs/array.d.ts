/**
 * Sort array of objects by key property
 * @example
 * // returns [ { name: 'Davi' }, { name: 'João' }, { name: 'Maria' }, { name: 'Pedro' } ]
 * [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }].sort(sortByKey('name'));
 */
export declare function sortByKey(k: string): (a: {
    [key: string]: unknown;
}, b: {
    [key: string]: unknown;
}) => 0 | 1 | -1;
/**
 * Split array into chunks
 * @example
 * // returns [ ['a', 'b', 'c'], ['d', 'e', 'f'] ]
 * splitArray(['a', 'b', 'c', 'd', 'e', 'f'], 3);
 */
export declare function splitArray(array: Array<string | number>, chunkSize: number): (string | number)[][];
