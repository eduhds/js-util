/**
 * Sort array of object by key property
 */
export function sortByKey(k: string) {
  return function (a: unknown, b: unknown) {
    // @ts-ignore
    var textA = a[k];
    // @ts-ignore
    var textB = b[k];
    if (typeof textA === 'string') textA = textA.toUpperCase().trim();
    if (typeof textB === 'string') textB = textB.toUpperCase().trim();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };
}
