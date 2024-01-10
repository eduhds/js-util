/**
 * Selects and returns the value of the specified property from the given object.
 * @example
 * // returns 'bar'
 * keySelect('foo', { foo: 'bar' });
 * // returns 25
 * keySelect(2, [10, 20, 25]);
 */
export function keySelect<O extends object, K extends keyof O>(condition: K, options: O) {
  return options[condition];
}
