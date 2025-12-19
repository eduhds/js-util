export type SplitCharacter = '.' | ',' | ';' | '/' | '|' | '\\';

/* export type SegmentsToObject<T extends string, S extends SplitCharacter = '.'> =
  T extends `${infer H}${S}${infer R}` ?
    { [K in H]: SegmentsToObject<R, S> } :
    { [K in T]: {} }; */

// Helper type to split strings by separator more reliably
export type SegmentsToObject<T extends string, S extends SplitCharacter, F> = S extends '/'
  ? T extends `${infer H}/${infer R}`
    ? { [K in H]: SegmentsToObject<R, S, F> }
    : { [K in T]: F }
  : T extends `${infer H}${S}${infer R}`
    ? { [K in H]: SegmentsToObject<R, S, F> }
    : { [K in T]: F };

// Merge that preserves type information and handles functions correctly
export type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? A[K] extends Function
        ? A[K] // Functions take precedence (like get, post, etc.)
        : B[K] extends Function
          ? B[K]
          : A[K] extends object
            ? B[K] extends object
              ? Merge<A[K], B[K]> // Recursive merge for nested objects
              : A[K]
            : B[K] extends object
              ? B[K]
              : A[K] | B[K] // Union for primitives
      : A[K]
    : K extends keyof B
      ? B[K]
      : never;
};

// Optimized MergeAll using iterative approach to reduce recursion
// This version processes items in smaller batches to avoid deep recursion
export type MergeAll<T extends object> = T extends readonly [
  infer A,
  infer B,
  infer C,
  infer D,
  infer E,
  infer F,
  infer G,
  infer H,
  ...infer Rest
]
  ? Rest extends readonly any[]
    ? MergeAll<
        [
          Merge<
            Merge<Merge<A & {}, B & {}>, Merge<C & {}, D & {}>>,
            Merge<Merge<E & {}, F & {}>, Merge<G & {}, H & {}>>
          >,
          ...Rest
        ]
      >
    : Merge<
        Merge<Merge<A & {}, B & {}>, Merge<C & {}, D & {}>>,
        Merge<Merge<E & {}, F & {}>, Merge<G & {}, H & {}>>
      >
  : T extends readonly [infer A, infer B, infer C, infer D, ...infer Rest]
    ? Rest extends readonly any[]
      ? MergeAll<[Merge<Merge<A & {}, B & {}>, Merge<C & {}, D & {}>>, ...Rest]>
      : Merge<Merge<A & {}, B & {}>, Merge<C & {}, D & {}>>
    : T extends readonly [infer A, infer B, ...infer Rest]
      ? Rest extends readonly any[]
        ? MergeAll<[Merge<A & {}, B & {}>, ...Rest]>
        : Merge<A & {}, B & {}>
      : T extends readonly [infer A]
        ? A & {}
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

// Utility types to generate all possible paths in an object
// Get the element type of an array
type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

// Generate paths for a type, handling both objects and arrays
type PathKeys<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? T[K] extends readonly any[]
          ? ArrayElement<T[K]> extends object
            ? // Array of objects: allow numeric indices and continue path recursively
              | `${Prefix}${K}`
                | `${Prefix}${K}.${number}`
                | PathKeys<ArrayElement<T[K]>, `${Prefix}${K}.${number}.`>
            : // Array of primitives: just allow numeric indices
              `${Prefix}${K}` | `${Prefix}${K}.${number}`
          : T[K] extends object
            ? // Nested object: continue path recursively
              `${Prefix}${K}` | PathKeys<T[K], `${Prefix}${K}.`>
            : // Primitive value: just the key
              `${Prefix}${K}`
        : never;
    }[keyof T]
  : never;

// Main type that generates all possible paths
export type DeepKey<T> = PathKeys<T> extends infer U ? (U extends string ? U : never) : never;
