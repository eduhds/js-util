"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValueAtPath = exports.getValueAtPath = exports.keySelect = void 0;
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
/**
 * Returns the value at the specified path in the object.
 * @example
 * // returns 1
 * valueAtPath('foo.bar', { foo: { bar: 1 } });
 */
function getValueAtPath(path, obj, separator = '.') {
    return path.split(separator).reduce((a, c) => {
        if (!a)
            return a;
        return a instanceof Array ? (isNaN(+c) ? undefined : a[+c]) : a[c];
    }, obj);
}
exports.getValueAtPath = getValueAtPath;
/**
 * Returns a new object with the value set at the specified path.
 * @example
 * // returns { foo: 'rab' }
 * setValueAtPath('foo', 'rab', { foo: 'bar' });
 * // returns { a: { b: { c: { d: 'e' } } } }
 * setValueAtPath('a.b.c.d', 'e', { a: { b: { c: { d: 'f' } } } });
 */
function setValueAtPath(path, value, obj, separator = '.') {
    const setDeepValue = (o, p, v) => {
        const parts = p.split(separator);
        const key = parts[0];
        if (!key)
            return o;
        if (parts.length === 1) {
            o[key] = v;
        }
        else {
            if (typeof o[key] === 'object') {
                o[key] = setDeepValue((o[key] || {}), parts.slice(1).join(separator), v);
            }
        }
        return o;
    };
    return setDeepValue(obj, path, value);
}
exports.setValueAtPath = setValueAtPath;
