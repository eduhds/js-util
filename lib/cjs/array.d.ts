type ObjectSortItem = {
    [key: string]: string;
};
/**
 * Sort array of object by key property
 */
export declare function sortByKey(k: string): (a: ObjectSortItem, b: ObjectSortItem) => 1 | -1 | 0;
export {};
