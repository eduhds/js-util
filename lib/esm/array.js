"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitArray = exports.sortByKey = void 0;
/**
 * Sort array of objects by key property
 * @example
 * // returns [ { name: 'Davi' }, { name: 'João' }, { name: 'Maria' }, { name: 'Pedro' } ]
 * [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }].sort(sortByKey('name'));
 */
function sortByKey(k) {
    return function (a, b) {
        let textA = a[k];
        let textB = b[k];
        if (typeof textA === 'string')
            textA = textA.toUpperCase().trim();
        if (typeof textB === 'string')
            textB = textB.toUpperCase().trim();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
    };
}
exports.sortByKey = sortByKey;
/**
 * Split array into chunks
 * @example
 * // returns [ ['a', 'b', 'c'], ['d', 'e', 'f'] ]
 * splitArray(['a', 'b', 'c', 'd', 'e', 'f'], 3);
 */
function splitArray(array, chunkSize) {
    let splitedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        splitedArray.push(chunk);
    }
    return splitedArray;
}
exports.splitArray = splitArray;
