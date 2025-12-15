export type SplitCharacter = '.' | ',' | ';' | '/' | '|' | '\\';

/* export type SegmentsToObject<T extends string, S extends SplitCharacter = '.'> =
  T extends `${infer H}${S}${infer R}` ?
    { [K in H]: SegmentsToObject<R, S> } :
    { [K in T]: {} }; */

export type SegmentsToObject<
  T extends string,
  S extends SplitCharacter,
  F
> = T extends `${infer H}${S}${infer R}`
  ? { [K in H]: SegmentsToObject<R, S, F> }
  : { [K in T]: F };

export type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? Merge<A[K], B[K]>
      : A[K]
    : K extends keyof B
      ? B[K]
      : never;
};

export type MergeAll<T extends object> = T extends [infer A, ...infer R extends object[]]
  ? Merge<A & {}, MergeAll<R>>
  : {};

/* export type ArgsToMergedObject<T extends readonly string[], S extends SplitCharacter = '.'> =
  MergeAll<{ [I in keyof T]: SegmentsToObject<T[I], S> }>; */

export type ArgsToMergedObject<
  T extends readonly string[],
  S extends SplitCharacter,
  F
> = MergeAll<{
  [I in keyof T]: SegmentsToObject<T[I], S, F>;
}>;

// Tipo utilitário para *merging* de dois objetos recursivamente
export type DeepMerge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? DeepMerge<A[K], B[K]>
      : A[K]
    : K extends keyof B
      ? B[K]
      : never;
};

export type Separator<S> = S extends SplitCharacter ? S : '.';
