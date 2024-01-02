type ObjectSortItem = { [key: string]: string };

/**
 * Sort array of object by key property
 */
export function sortByKey(k: string) {
  return function (a: ObjectSortItem, b: ObjectSortItem) {
    let textA = a[k];
    let textB = b[k];
    if (typeof textA === 'string') textA = textA.toUpperCase().trim();
    if (typeof textB === 'string') textB = textB.toUpperCase().trim();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };
}
