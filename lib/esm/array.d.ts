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
/**
 * Filter array by key and value
 * @example
 * // returns [ { name: 'Davi' }, { name: 'João' }, { name: 'Maria' }, { name: 'Pedro' } ]
 * [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }].filterBy('name', 'Davi');
 */
export declare function filterBy<T, V>(array: Array<T>, key: keyof T, value: V, filterFn?: (i: T) => boolean): T[];
/**
 * Edit array item by index
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editAt(1, { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export declare function editAt<T>(index: number, value: Partial<T>, array: Array<T>): T[];
/**
 * Edit array item by predicate
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editWhere(p => p.name === 'Pedro', { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export declare function editWhere<T>(predicate: (item: T) => boolean, value: Partial<T> | ((item: T) => Partial<T>), array: Array<T>): T[];
/**
 * Remove array item by index
 * @example
 * // returns [ { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * removeAt(1, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export declare function removeAt<T>(index: number, array: Array<T>): T[];
/**
 * Remove array item by predicate
 * @example
 * // returns [ { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * removeWhere(p => p.name === 'Pedro', [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export declare function removeWhere<T>(predicate: (item: T) => boolean, array: Array<T>): T[];
