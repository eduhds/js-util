export type SplitCharacter = '.' | ',' | ';' | '/' | '|' | '\\';
export type SegmentsToObject<T extends string, S extends SplitCharacter, F> = S extends '/' ? T extends `${infer H}/${infer R}` ? {
    [K in H]: SegmentsToObject<R, S, F>;
} : {
    [K in T]: F;
} : T extends `${infer H}${S}${infer R}` ? {
    [K in H]: SegmentsToObject<R, S, F>;
} : {
    [K in T]: F;
};
export type Merge<A, B> = {
    [K in keyof A | keyof B]: K extends keyof A ? K extends keyof B ? A[K] extends Function ? A[K] : B[K] extends Function ? B[K] : A[K] extends object ? B[K] extends object ? Merge<A[K], B[K]> : A[K] : B[K] extends object ? B[K] : A[K] | B[K] : A[K] : K extends keyof B ? B[K] : never;
};
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
] ? Rest extends readonly any[] ? MergeAll<[
    Merge<Merge<Merge<A & {}, B & {}>, Merge<C & {}, D & {}>>, Merge<Merge<E & {}, F & {}>, Merge<G & {}, H & {}>>>,
    ...Rest
]> : Merge<Merge<Merge<A & {}, B & {}>, Merge<C & {}, D & {}>>, Merge<Merge<E & {}, F & {}>, Merge<G & {}, H & {}>>> : T extends readonly [infer A, infer B, infer C, infer D, ...infer Rest] ? Rest extends readonly any[] ? MergeAll<[Merge<Merge<A & {}, B & {}>, Merge<C & {}, D & {}>>, ...Rest]> : Merge<Merge<A & {}, B & {}>, Merge<C & {}, D & {}>> : T extends readonly [infer A, infer B, ...infer Rest] ? Rest extends readonly any[] ? MergeAll<[Merge<A & {}, B & {}>, ...Rest]> : Merge<A & {}, B & {}> : T extends readonly [infer A] ? A & {} : {};
export type ArgsToMergedObject<T extends readonly string[], S extends SplitCharacter, F> = MergeAll<{
    [I in keyof T]: SegmentsToObject<T[I], S, F>;
}>;
export type DeepMerge<A, B> = {
    [K in keyof A | keyof B]: K extends keyof A ? K extends keyof B ? DeepMerge<A[K], B[K]> : A[K] : K extends keyof B ? B[K] : never;
};
export type Separator<S> = S extends SplitCharacter ? S : '.';
