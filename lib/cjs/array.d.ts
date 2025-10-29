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
export declare function splitArray<T>(array: T[], chunkSize: number): T[][];
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
export declare function editAt<T>(index: number, value: T | ((value: T) => T), array: Array<T>): T[];
/**
 * Edit array item by predicate
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editWhere(p => p.name === 'Pedro', { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export declare function editWhere<T>(predicate: (item: T) => boolean, value: T | ((value: T) => T), array: Array<T>): T[];
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
/**
 * Search array items
 * @example
 * // returns [ { name: 'João' } ]
 * searchedItems('João', [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }], ['name']);
 * @example
 * // returns [ 'banana' ]
 * searchedItems('Banana', ['banana', 'maca', 'laranja', 'abacate']);
 */
export declare function searchedItems<T>(search: string, items: T[], fields?: (keyof T)[]): T[];
/**
 * Insert array item by index
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * insertAt(1, { name: 'João' }, [{ name: 'Pedro' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export declare function insertAt<T>(index: number, value: T, array: Array<T>): T[];
/**
 * Insert array item
 * @example
 * // returns [ 1, 2, 3, 4, 5 ]
 * insert(5, [1, 2, 3, 4]);
 */
export declare function insert<T>(value: T, array: Array<T>): T[];
/**
 * Shuffle array
 * @example
 * // returns [ 5, 4, 3, 2, 1 ] (random)
 * shuffle([1, 2, 3, 4, 5]);
 */
export declare function shuffle<T>(array: T[]): T[];
/**
 * Group array by key
 * @example
 * // returns [ [ { name: 'Pedro', age: 20 }, { name: 'Maria', age: 20 } ], [ { name: 'João', age: 15 } ] ]
 * groupByKey([{ name: 'Pedro', age: 20 }, { name: 'João': age: 15 }, { name: 'Maria', age: 20 }], 'age');
 */
export declare function groupByKey<T, K extends keyof T>(list: T[], key: K): T[][];
