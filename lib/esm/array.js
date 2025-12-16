import { normalizeLower } from './string';
/**
 * Sort array of objects by key property
 * @example
 * // returns [ { name: 'Davi' }, { name: 'João' }, { name: 'Maria' }, { name: 'Pedro' } ]
 * [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }].sort(sortByKey('name'));
 */
export function sortByKey(k) {
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
/**
 * Split array into chunks
 * @example
 * // returns [ ['a', 'b', 'c'], ['d', 'e', 'f'] ]
 * splitArray(['a', 'b', 'c', 'd', 'e', 'f'], 3);
 */
export function splitArray(array, chunkSize) {
    let splitedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        splitedArray.push(chunk);
    }
    return splitedArray;
}
/**
 * Filter array by key and value
 * @example
 * // returns [ { name: 'Davi' }, { name: 'João' }, { name: 'Maria' }, { name: 'Pedro' } ]
 * filterBy([{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }], 'name', 'Davi');
 */
export function filterBy(array, key, value, filterFn) {
    if (typeof value !== 'number' && typeof value !== 'boolean' && !value)
        return array;
    return array.filter(filterFn || (item => item[key] === value));
}
/**
 * Edit array item by index
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editAt(1, { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function editAt(index, value, array) {
    return array.map((item, i) => i === index ? (value instanceof Function ? value(item) : value) : item);
}
/**
 * Edit array item by predicate
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editWhere(p => p.name === 'Pedro', { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function editWhere(predicate, value, array) {
    return array.map(item => {
        if (predicate(item))
            return value instanceof Function ? value(item) : value;
        return item;
    });
}
/**
 * Remove array item by index
 * @example
 * // returns [ { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * removeAt(1, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function removeAt(index, array) {
    return array.filter((_, i) => i !== index);
}
/**
 * Remove array item by predicate
 * @example
 * // returns [ { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * removeWhere(p => p.name === 'Pedro', [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function removeWhere(predicate, array) {
    return array.filter(item => !predicate(item));
}
/**
 * Search array items
 * @example
 * // returns [ { name: 'João' } ]
 * searchedItems('João', [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }], ['name']);
 * @example
 * // returns [ 'banana' ]
 * searchedItems('Banana', ['banana', 'maca', 'laranja', 'abacate']);
 */
export function searchedItems(search, items, fields) {
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
            .filter(item => fields.some(field => normalizeLower(makeItemSearchable(item[field])).search(normalizeLower(search)) !== -1));
    }
    return items.filter(item => normalizeLower(makeItemSearchable(item)).search(normalizeLower(search)) !== -1);
}
/**
 * Insert array item by index
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * insertAt(1, { name: 'João' }, [{ name: 'Pedro' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function insertAt(index, value, array) {
    return [...array.slice(0, index), value, ...array.slice(index)];
}
/**
 * Insert array item
 * @example
 * // returns [ 1, 2, 3, 4, 5 ]
 * insert(5, [1, 2, 3, 4]);
 */
export function insert(value, array) {
    return [...array, value];
}
/**
 * Shuffle array
 * @example
 * // returns [ 5, 4, 3, 2, 1 ] (random)
 * shuffle([1, 2, 3, 4, 5]);
 */
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
/**
 * Group array by key
 * @example
 * // returns [ [ { name: 'Pedro', age: 20 }, { name: 'Maria', age: 20 } ], [ { name: 'João', age: 15 } ] ]
 * groupByKey([{ name: 'Pedro', age: 20 }, { name: 'João', age: 15 }, { name: 'Maria', age: 20 }], 'age');
 */
export function groupByKey(list, key) {
    const keys = [];
    return list.reduce((acc, item) => {
        let groupKey = keys.findIndex(k => k === item[key]);
        if (groupKey === -1) {
            groupKey = keys.push(item[key]) - 1;
        }
        (acc[groupKey] = acc[groupKey] || []).push(item);
        return acc;
    }, []);
}
/**
 * Filter array with filters
 * @example
 * // returns [ { name: 'Pedro', age: 20 }, { name: 'Maria', age: 20 } ]
 * filteredList([{ name: 'Pedro', age: 20 }, { name: 'João', age: 15 }, { name: 'Maria', age: 20 }], { key: 'age', value: 20 });
 */
export function filteredList(items, filter) {
    let list = [...items];
    const filterFn = (f, i) => {
        return typeof f.value === 'object' && Array.isArray(f.value)
            ? f.value.length
                ? f.value.includes(i[f.key])
                : true
            : f.value instanceof Function
                ? f.value(i)
                : f.value === i[f.key];
    };
    if (typeof filter === 'object' && Array.isArray(filter)) {
        for (const f of filter) {
            list = list.filter(i => filterFn(f, i));
        }
    }
    else {
        list = list.filter(i => filterFn(filter, i));
    }
    return list;
}
