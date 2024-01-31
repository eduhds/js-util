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
}) => 1 | -1 | 0;
