"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeWhere = exports.removeAt = exports.editWhere = exports.editAt = exports.filterBy = exports.splitArray = exports.sortByKey = void 0;
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
// TODO: Support primitive values
/**
 * Filter array by key and value
 * @example
 * // returns [ { name: 'Davi' }, { name: 'João' }, { name: 'Maria' }, { name: 'Pedro' } ]
 * [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }].filterBy('name', 'Davi');
 */
function filterBy(array, key, value, filterFn) {
    if (typeof value !== 'number' && typeof value !== 'boolean' && !value)
        return array;
    return array.filter(filterFn || (item => item[key] === value));
}
exports.filterBy = filterBy;
/**
 * Edit array item by index
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editAt(1, { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
function editAt(index, value, array) {
    return array.map((item, i) => (i === index ? Object.assign(Object.assign({}, item), value) : item));
}
exports.editAt = editAt;
/**
 * Edit array item by predicate
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editWhere(p => p.name === 'Pedro', { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
function editWhere(predicate, value, array) {
    return array.map(item => predicate(item) ? Object.assign(Object.assign({}, item), (typeof value === 'function' ? value(item) : value)) : item);
}
exports.editWhere = editWhere;
/**
 * Remove array item by index
 * @example
 * // returns [ { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * removeAt(1, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
function removeAt(index, array) {
    return array.filter((_, i) => i !== index);
}
exports.removeAt = removeAt;
/**
 * Remove array item by predicate
 * @example
 * // returns [ { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * removeWhere(p => p.name === 'Pedro', [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
function removeWhere(predicate, array) {
    return array.filter(item => !predicate(item));
}
exports.removeWhere = removeWhere;
