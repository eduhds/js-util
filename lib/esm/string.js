/**
 * Format number as: 100000.00 to 100.000,00
 * @deprecated use `maskNumberDecimals` instead
 */
export function formatMoneyBR(value) {
    if (typeof value !== 'number')
        throw new Error('Param is not a string');
    return value
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
/**
 * Format Placa automotiva
 */
export function formatPlacaOld(value) {
    if (typeof value !== 'string')
        throw new Error('Param is not a string');
    return value.toUpperCase().replace(/([A-Z]{3})([0-9]{4})/, '$1-$2');
}
/**
 * Format text to lowercase and without special characters
 */
export function normalizeLower(text) {
    if (typeof text !== 'string')
        throw new Error('Param is not a string');
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}
/**
 * Return text with first letter to uppercase
 * @example
 * // returns Lorem ipsum
 * capitalize('lorem ipsum')
 */
export function capitalize(text) {
    if (typeof text !== 'string')
        throw new Error('Param is not a string');
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
/**
 * Return text with all word first letter to uppercase
 * @example
 * // returns 'Lorem Ipsum Dolor Sit'
 * titleize('lorem ipsum dolor sit')
 */
export function titleize(text) {
    if (typeof text !== 'string')
        throw new Error('Param is not a string');
    return text.split(' ').map(capitalize).join(' ');
}
/**
 * Extract number from text
 */
export function numberFromText(text) {
    if (typeof text !== 'string')
        throw new Error('Param is not a string');
    let number = text.replace(/\D/g, '').replace(',', '.').trim();
    return Number(number);
}
/**
 * Get file name from a file system path string
 */
export function fileNameFromPath(path) {
    if (typeof path !== 'string')
        throw new Error('Param is not a string');
    let pathReverse = path.split('').reverse();
    let fileName = pathReverse.slice(0, pathReverse.indexOf('/')).reverse().join('');
    return fileName;
}
/**
 * Get extension from file name string
 */
export function extensionFromFileName(fileName) {
    if (typeof fileName !== 'string')
        throw new Error('Param is not a string');
    let reversed = fileName.split('').reverse();
    let extension = reversed.slice(0, reversed.indexOf('.')).reverse().join('');
    return extension;
}
/**
 * Parse url
 */
export function parseUrl(url, parameters = {}) {
    if (!url)
        throw new Error('url is required');
    function resolveParams(values, delimiter = '$') {
        return url.split('/').reduce((acc, part) => {
            const param = part.startsWith(delimiter.at(0) || '$') ? part : undefined;
            if (param) {
                acc[param] = values[param] || typeof undefined;
            }
            return acc;
        }, {});
    }
    function replaceParams(params) {
        for (const param in params) {
            url = url.replace(param, params[param]);
        }
        return url;
    }
    let queryString = '';
    [url, queryString] = url.trim().split('?');
    // remove trailing slash
    if (url.endsWith('/')) {
        url = url.slice(0, url.length - 1);
    }
    const query = queryString
        ? queryString.split('&').reduce((acc, param) => {
            const [key, value] = param.split('=');
            acc[key] = value;
            return acc;
        }, {})
        : {};
    const [protocol, address] = url.split('://');
    if (protocol !== 'http' && protocol !== 'https') {
        throw new Error('Invalid protocol');
    }
    const [domain] = address.split('/').filter(Boolean);
    const params = resolveParams(parameters);
    if (Object.keys(parameters).length) {
        replaceParams(params);
    }
    // normalize url
    url.replace(/\/+/g, '/').replace(':/', '://');
    const baseUrl = url;
    return {
        baseUrl,
        protocol,
        domain,
        query,
        params,
        resolveParams,
        replaceParams
    };
}
