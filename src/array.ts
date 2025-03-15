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
export function splitArray(array: Array<string | number>, chunkSize: number) {
  let splitedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    splitedArray.push(chunk);
  }
  return splitedArray;
}

// TODO: Support primitive values

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
export function editAt<T>(index: number, value: Partial<T>, array: Array<T>) {
  return array.map((item, i) => (i === index ? { ...item, ...value } : item));
}

/**
 * Edit array item by predicate
 * @example
 * // returns [ { name: 'Pedro' }, { name: 'Marcos' }, { name: 'Maria' }, { name: 'Davi' } ]
 * editWhere(p => p.name === 'Pedro', { name: 'Marcos' }, [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }]);
 */
export function editWhere<T>(
  predicate: (item: T) => boolean,
  value: Partial<T> | ((item: T) => Partial<T>),
  array: Array<T>
) {
  return array.map(item =>
    predicate(item) ? { ...item, ...(typeof value === 'function' ? value(item) : value) } : item
  );
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
