type ObjectSortItem = { [key: string]: unknown };

/**
 * Sort array of objects by key property
 * @example
 * // returns [ { name: 'Davi' }, { name: 'João' }, { name: 'Maria' }, { name: 'Pedro' } ]
 * [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }].sort(sortByKey('name'));
 */
export function sortByKey(k: string) {
  return function (a: ObjectSortItem, b: ObjectSortItem) {
    let textA = a[k] as string | number;
    let textB = b[k] as string | number;
    if (typeof textA === 'string') textA = textA.toUpperCase().trim();
    if (typeof textB === 'string') textB = textB.toUpperCase().trim();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };
}
