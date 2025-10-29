import { normalizeLower } from './string';

/**
 * Sort array of objects by key property
 * @example
 * // returns [ { name: 'Davi' }, { name: 'João' }, { name: 'Maria' }, { name: 'Pedro' } ]
 * [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }].sort(sortByKey('name'));
 */
export function sortByKey(k: string) {
  return function (a: { [key: string]: unknown }, b: { [key: string]: unknown }) {
    let textA = a[k] as string | number;
    let textB = b[k] as string | number;
    if (typeof textA === 'string') textA = textA.toUpperCase().trim();
    if (typeof textB === 'string') textB = textB.toUpperCase().trim();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };
}

/**
 * Split array into chunks
 * @example
 * // returns [ ['a', 'b', 'c'], ['d', 'e', 'f'] ]
 * splitArray(['a', 'b', 'c', 'd', 'e', 'f'], 3);
 */
export function splitArray<T>(array: T[], chunkSize: number) {
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
 * [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }].filterBy('name', 'Davi');
 */
export function filterBy<T, V>(
  array: Array<T>,
  key: keyof T,
  value: V,
  filterFn?: (i: T) => boolean
) {
  if (typeof value !== 'number' && typeof value !== 'boolean' && !value) return array;
  return array.filter(filterFn || (item => item[key] === value));
}

/**
 * Edit array item by index
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editAt(1, { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function editAt<T>(index: number, value: T | ((value: T) => T), array: Array<T>) {
  return array.map((item, i) =>
    i === index ? (value instanceof Function ? value(item) : value) : item
  );
}

/**
 * Edit array item by predicate
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editWhere(p => p.name === 'Pedro', { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function editWhere<T>(
  predicate: (item: T) => boolean,
  value: T | ((value: T) => T),
  array: Array<T>
) {
  return array.map(item => {
    if (predicate(item)) return value instanceof Function ? value(item) : value;
    return item;
  });
}

/**
 * Remove array item by index
 * @example
 * // returns [ { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * removeAt(1, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function removeAt<T>(index: number, array: Array<T>) {
  return array.filter((_, i) => i !== index);
}

/**
 * Remove array item by predicate
 * @example
 * // returns [ { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * removeWhere(p => p.name === 'Pedro', [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function removeWhere<T>(predicate: (item: T) => boolean, array: Array<T>) {
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
export function searchedItems<T>(search: string, items: T[], fields?: (keyof T)[]) {
  if (!search) {
    return items;
  }

  const makeItemSearchable = (item: T | T[keyof T]) => {
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
        return item as string;
    }
  };

  if (fields?.length) {
    items
      .filter(item => item && typeof item === 'object')
      .filter(item =>
        fields.some(
          field =>
            normalizeLower(makeItemSearchable(item[field])).search(normalizeLower(search)) !== -1
        )
      );
  }

  return items.filter(
    item => normalizeLower(makeItemSearchable(item)).search(normalizeLower(search)) !== -1
  );
}

/**
 * Insert array item by index
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' } ]
 * insertAt(1, { name: 'João' }, [{ name: 'Pedro' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function insertAt<T>(index: number, value: T, array: Array<T>) {
  return [...array.slice(0, index), value, ...array.slice(index)];
}

/**
 * Insert array item
 * @example
 * // returns [ 1, 2, 3, 4, 5 ]
 * insert(5, [1, 2, 3, 4]);
 */
export function insert<T>(value: T, array: Array<T>) {
  return [...array, value];
}

/**
 * Shuffle array
 * @example
 * // returns [ 5, 4, 3, 2, 1 ] (random)
 * shuffle([1, 2, 3, 4, 5]);
 */
export function shuffle<T>(array: T[]) {
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
 * groupByKey([{ name: 'Pedro', age: 20 }, { name: 'João': age: 15 }, { name: 'Maria', age: 20 }], 'age');
 */
export function groupByKey<T, K extends keyof T>(list: T[], key: K) {
  const keys: T[K][] = [];
  return list.reduce(
    (acc, item) => {
      let groupKey = keys.findIndex(k => k === item[key]);
      if (groupKey === -1) {
        groupKey = keys.push(item[key]) - 1;
      }
      (acc[groupKey] = acc[groupKey] || []).push(item);
      return acc;
    },
    [] as Array<T[]>
  );
}
