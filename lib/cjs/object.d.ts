import type { ArgsToMergedObject, DeepMerge, Separator, SplitCharacter } from './@types/object';
/**
 * Selects and returns the value of the specified property from the given object.
 * @example
 * // returns 'bar'
 * keySelect('foo', { foo: 'bar' });
 * // returns 25
 * keySelect(2, [10, 20, 25]);
 */
export declare function keySelect<O extends object, K extends keyof O>(condition: K, options: O): O[K];
/**
 * Returns the value at the specified path in the object.
 * @example
 * // returns 1
 * valueAtPath('foo.bar', { foo: { bar: 1 } });
 */
export declare function getValueAtPath<T extends object>(path: string, obj: T, separator?: string): T;
/**
 * Define o tipo para acessar valores profundos de um objeto.
 */
/**
 * Define o tipo para acessar valores profundos de um objeto, incluindo arrays.
 */
export type DeepValue<T, P extends string> = P extends `${infer Key}.${infer Rest}` ? Key extends keyof T ? DeepValue<T[Key], Rest> : Key extends `${number}` ? T extends Array<infer U> ? DeepValue<U, Rest> : never : never : P extends keyof T ? T[P] : P extends `${number}` ? T extends Array<infer U> ? U : never : never;
/**
 * Returns a new object with the value set at the specified path.
 * @example
 * // returns { foo: 'rab' }
 * setValueAtPath('foo', 'rab', { foo: 'bar' });
 * // returns { a: { b: { c: { d: 'e' } } } }
 * setValueAtPath('a.b.c.d', 'e', { a: { b: { c: { d: 'f' } } } });
 */
export declare function setValueAtPath<T extends object, P extends string>(path: P, value: DeepValue<T, P>, obj: T, separator?: string): T;
/**
 * Converts a JSON object to a Blob object.
 * @example
 * // returns new Blob
 * await jsonToBlob({foo: 'bar'})
 */
export declare function jsonToBlob<T>(json: T): Promise<Blob>;
/**
 * Converts a Blob object to a JSON object.
 * @example
 * // returns { foo: 'bar' }
 * await blobToJson<{foo: string}>(await jsonToBlob({foo: 'bar'}))
 */
export declare function blobToJson<T>(blob: Blob): Promise<T>;
export declare function remapProperties<T extends object, UArr extends readonly [readonly (keyof T)[], U][], U extends string | number | symbol = UArr[number][1]>(obj: T, props: UArr): {
    [K in UArr[number][1]]: T[keyof T];
};
export declare function remapProperties<T extends object, UArr extends readonly [readonly (keyof T)[], U][], U extends string | number | symbol = UArr[number][1]>(obj: T, props: UArr, merge: 'merge'): T & {
    [K in UArr[number][1]]: T[keyof T];
};
export declare function splitSegmentsToObjectFields<T extends readonly string[], S extends SplitCharacter = '.'>(segments: readonly [...T]): ArgsToMergedObject<T, S, {}>;
export declare function splitSegmentsToObjectFields<T extends readonly string[], O extends object, F extends any, C extends {
    separator?: SplitCharacter;
    initialValue?: O;
    finalValue?: (index: number) => F;
}>(segments: readonly [...T], options: C): DeepMerge<ArgsToMergedObject<T, Separator<C['separator']>, C['finalValue'] extends Function ? ReturnType<C['finalValue']> : C['finalValue']>, C['initialValue']>;
