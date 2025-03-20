"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchedItems = exports.removeWhere = exports.removeAt = exports.editWhere = exports.editAt = exports.filterBy = exports.splitArray = exports.sortByKey = void 0;
const string_1 = require("./string");
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
    return array.map((item, i) => {
        if (!item || ['boolean', 'number', 'string'].includes(typeof item)) {
            return i === index ? value : item;
        }
        return i === index
            ? Object.assign(Object.assign({}, item), (!value || ['boolean', 'number', 'string'].includes(typeof value) ? {} : value)) : item;
    });
}
exports.editAt = editAt;
/**
 * Edit array item by predicate
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editWhere(p => p.name === 'Pedro', { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
function editWhere(predicate, value, array) {
    return array.map(item => {
        if (predicate(item)) {
            if (!item || ['boolean', 'number', 'string'].includes(typeof item)) {
                return typeof value === 'function' ? value(item) : value;
            }
            return Object.assign(Object.assign({}, item), (!value || ['boolean', 'number', 'string'].includes(typeof value)
                ? {}
                : typeof value === 'function'
                    ? value(item)
                    : value));
        }
        return item;
    });
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
/**
 * Search array items
 * @example
 * // returns [ { name: 'João' } ]
 * searchedItems('João', [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }], ['name']);
 * @example
 * // returns [ 'banana' ]
 * searchedItems('Banana', ['banana', 'maca', 'laranja', 'abacate']);
 */
function searchedItems(search, items, fields) {
    if (!search) {
        return items;
    }
    const makeItemSearchable = (item) => {
        switch (typeof item) {
            case 'boolean':
            case 'number':
            case 'bigint':
            case 'function':
            case 'symbol':
                return item.toString();
            case 'undefined':
                return '';
            case 'object':
                return JSON.stringify(item);
            default:
                return item;
        }
    };
    if (fields === null || fields === void 0 ? void 0 : fields.length) {
        items
            .filter(item => item && typeof item === 'object')
            .filter(item => fields.some(field => (0, string_1.normalizeLower)(makeItemSearchable(item[field])).search((0, string_1.normalizeLower)(search)) !== -1));
    }
    return items.filter(item => (0, string_1.normalizeLower)(makeItemSearchable(item)).search((0, string_1.normalizeLower)(search)) !== -1);
}
exports.searchedItems = searchedItems;
