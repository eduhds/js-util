"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByKey = void 0;
/**
 * Sort array of object by key property
 */
function sortByKey(k) {
    return function (a, b) {
        // @ts-ignore
        var textA = a[k];
        // @ts-ignore
        var textB = b[k];
        if (typeof textA === 'string')
            textA = textA.toUpperCase().trim();
        if (typeof textB === 'string')
            textB = textB.toUpperCase().trim();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
    };
}
exports.sortByKey = sortByKey;
