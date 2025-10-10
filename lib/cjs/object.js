"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remapProperties = exports.blobToJson = exports.jsonToBlob = exports.setValueAtPath = exports.getValueAtPath = exports.keySelect = void 0;
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
/**
 * Converts a JSON object to a Blob object.
 * @example
 * // returns new Blob
 * await jsonToBlob({foo: 'bar'})
 */
async function jsonToBlob(json) {
    return new Blob([JSON.stringify(json)], { type: 'application/json' });
}
exports.jsonToBlob = jsonToBlob;
/**
 * Converts a Blob object to a JSON object.
 * @example
 * // returns { foo: 'bar' }
 * await blobToJson<{foo: string}>(await jsonToBlob({foo: 'bar'}))
 */
async function blobToJson(blob) {
    if (blob.type !== 'application/json') {
        throw new Error('Blob is not a JSON file');
    }
    const text = await blob.text();
    const json = JSON.parse(text);
    return json;
}
exports.blobToJson = blobToJson;
/**
 * Returns a new object with the specified properties mapped to the given object.
 * @example
 * // returns { foo: 'bar' }
 * remapProperties({ oof: 'bar' }, [[['oof'], 'foo']]);
 */
function remapProperties(obj, props, merge) {
    // Recebe um objeto e um “mapa” que relaciona (possivelmente vários) campos do objeto original a novas propriedades do objeto de retorno.
    // O resultado é um novo objeto cujas chaves são os nomes “destino” e os valores são copiados dos campos “origem” do objeto original.
    const newObj = {};
    for (const prop of props) {
        const [from, to] = prop;
        for (const key of from) {
            newObj[to] = obj[key];
        }
    }
    if (merge) {
        return Object.assign(Object.assign({}, obj), newObj);
    }
    return newObj;
}
exports.remapProperties = remapProperties;
