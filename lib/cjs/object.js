"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keySelect = void 0;
/**
 * Selects and returns the value of the specified property from the given object.
 * @example
 * // returns 'bar'
 * keySelect('foo', { foo: 'bar' });
 * // returns 25
 * keySelect(2, [10, 20, 25]);
 */
function keySelect(condition, options) {
    return options[condition];
}
exports.keySelect = keySelect;
