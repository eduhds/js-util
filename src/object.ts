import type { ArgsToMergedObject, DeepMerge, Separator, SplitCharacter } from './@types/object';

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

/**
 * Converts a JSON object to a Blob object.
 * @example
 * // returns new Blob
 * await jsonToBlob({foo: 'bar'})
 */
export async function jsonToBlob<T>(json: T) {
  return new Blob([JSON.stringify(json)], { type: 'application/json' });
}

/**
 * Converts a Blob object to a JSON object.
 * @example
 * // returns { foo: 'bar' }
 * await blobToJson<{foo: string}>(await jsonToBlob({foo: 'bar'}))
 */
export async function blobToJson<T>(blob: Blob) {
  if (blob.type !== 'application/json') {
    throw new Error('Blob is not a JSON file');
  }
  const text = await blob.text();
  const json = JSON.parse(text);
  return json as T;
}

export function remapProperties<
  T extends object,
  UArr extends readonly [readonly (keyof T)[], U][],
  U extends string | number | symbol = UArr[number][1]
>(obj: T, props: UArr): { [K in UArr[number][1]]: T[keyof T] };

export function remapProperties<
  T extends object,
  UArr extends readonly [readonly (keyof T)[], U][],
  U extends string | number | symbol = UArr[number][1]
>(obj: T, props: UArr, merge: 'merge'): T & { [K in UArr[number][1]]: T[keyof T] };

/**
 * Returns a new object with the specified properties mapped to the given object.
 * @example
 * // returns { foo: 'bar' }
 * remapProperties({ oof: 'bar' }, [[['oof'], 'foo']]);
 */
export function remapProperties(obj: any, props: any, merge?: any) {
  // Recebe um objeto e um “mapa” que relaciona (possivelmente vários) campos do objeto original a novas propriedades do objeto de retorno.
  // O resultado é um novo objeto cujas chaves são os nomes “destino” e os valores são copiados dos campos “origem” do objeto original.

  const newObj: any = {};

  for (const prop of props) {
    const [from, to] = prop;

    for (const key of from) {
      newObj[to] = obj[key];
    }
  }

  if (merge) {
    return { ...obj, ...newObj };
  }

  return newObj;
}

export function splitSegmentsToObjectFields<
  T extends readonly string[],
  S extends SplitCharacter = '.'
>(segments: readonly [...T]): ArgsToMergedObject<T, S, {}>; // Sem options

export function splitSegmentsToObjectFields<
  T extends readonly string[],
  O extends object,
  F extends any,
  C extends {
    separator?: SplitCharacter;
    initialValue?: O;
    finalValue?: (index: number) => F;
  }
>(
  segments: readonly [...T],
  options: C
): DeepMerge<
  ArgsToMergedObject<
    T,
    Separator<C['separator']>,
    C['finalValue'] extends Function ? ReturnType<C['finalValue']> : C['finalValue']
  >,
  C['initialValue']
>; // Com options

export function splitSegmentsToObjectFields(segments: any, options?: any) {
  let result: any = options?.initialValue ? { ...options.initialValue } : {};

  for (const seg of segments) {
    const parts = seg.split(options?.separator || '.');
    let current = result;
    for (const part of parts) {
      if (part === parts[parts.length - 1]) {
        current[part] =
          current[part] ||
          (options?.finalValue
            ? options.finalValue instanceof Function
              ? options.finalValue(segments.indexOf(seg))
              : undefined
            : {});
      } else {
        current[part] = current[part] || {};
      }
      current = current[part];
    }
  }

  return result;
}
