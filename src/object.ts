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

/**
 * Returns the value at the specified path in the object.
 * @example
 * // returns 1
 * valueAtPath('foo.bar', { foo: { bar: 1 } });
 */
export function getValueAtPath<T extends object>(path: string, obj: T, separator: string = '.') {
  return path.split(separator).reduce((a, c) => {
    if (!a) return a;
    return a instanceof Array ? (isNaN(+c) ? undefined : a[+c]) : a[c as keyof T];
  }, obj);
}

/**
 * Define o tipo para acessar valores profundos de um objeto.
 */
/* export type DeepValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? DeepValue<T[Key], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never; */

/**
 * Define o tipo para acessar valores profundos de um objeto, incluindo arrays.
 */
export type DeepValue<T, P extends string> = P extends `${infer Key}.${infer Rest}` // Verifica se há mais níveis no caminho
  ? Key extends keyof T // Se a chave atual for válida para o objeto
    ? DeepValue<T[Key], Rest> // Continua a recursão
    : Key extends `${number}` // Se a chave for um índice numérico
      ? T extends Array<infer U> // Verifica se T é um array
        ? DeepValue<U, Rest> // Continua a recursão no tipo do elemento do array
        : never
      : never
  : P extends keyof T // Caso base: verifica se P é uma chave válida de T
    ? T[P]
    : P extends `${number}` // Caso base: verifica se P é um índice numérico
      ? T extends Array<infer U>
        ? U
        : never
      : never;

/**
 * Returns a new object with the value set at the specified path.
 * @example
 * // returns { foo: 'rab' }
 * setValueAtPath('foo', 'rab', { foo: 'bar' });
 * // returns { a: { b: { c: { d: 'e' } } } }
 * setValueAtPath('a.b.c.d', 'e', { a: { b: { c: { d: 'f' } } } });
 */
export function setValueAtPath<T extends object, P extends string>(
  path: P,
  value: DeepValue<T, P>,
  obj: T,
  separator: string = '.'
) {
  const setDeepValue = <T extends object, P extends string>(o: T, p: P, v: DeepValue<T, P>) => {
    const parts = p.split(separator);
    const key = parts[0] as keyof T;

    if (!key) return o;

    if (parts.length === 1) {
      o[key] = v as T[keyof T];
    } else {
      if (typeof o[key] === 'object') {
        o[key] = setDeepValue<T[keyof T] & object, P>(
          (o[key] || {}) as T[keyof T] & object,
          parts.slice(1).join(separator) as P,
          v as DeepValue<T[keyof T] & object, P>
        ) as T[keyof T];
      }
    }

    return o;
  };

  return setDeepValue(obj, path, value);
}
