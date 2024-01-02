"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionFromFileName = exports.fileNameFromPath = exports.numberFromText = exports.capitalize = exports.normalizeLower = exports.formatPlacaOld = exports.formatMoneyBR = void 0;
/**
 * Format number as: 100000.00 to 100.000,00
 */
function formatMoneyBR(value) {
    if (typeof value !== 'number')
        throw new Error('Param is not a string');
    return value
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
exports.formatMoneyBR = formatMoneyBR;
/**
 * Format Placa automotiva
 */
function formatPlacaOld(value) {
    if (typeof value !== 'string')
        throw new Error('Param is not a string');
    return value.toUpperCase().replace(/([A-Z]{3})([0-9]{4})/, '$1-$2');
}
exports.formatPlacaOld = formatPlacaOld;
/**
 * Format text to lowercase and without special characters
 */
function normalizeLower(text) {
    if (typeof text !== 'string')
        throw new Error('Param is not a string');
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}
exports.normalizeLower = normalizeLower;
/**
 * Return text with first letter to uppercase
 */
function capitalize(text) {
    if (typeof text !== 'string')
        throw new Error('Param is not a string');
    return text.length > 1 ? text.charAt(0).toUpperCase() + text.slice(1) : text.toUpperCase();
}
exports.capitalize = capitalize;
/**
 * Extract number from text
 */
function numberFromText(text) {
    if (typeof text !== 'string')
        throw new Error('Param is not a string');
    let number = text.replace(/\D/g, '').replace(',', '.').trim();
    return Number(number);
}
exports.numberFromText = numberFromText;
/**
 * Get file name from a file system path string
 */
function fileNameFromPath(path) {
    if (typeof path !== 'string')
        throw new Error('Param is not a string');
    let pathReverse = path.split('').reverse();
    let fileName = pathReverse.slice(0, pathReverse.indexOf('/')).reverse().join('');
    return fileName;
}
exports.fileNameFromPath = fileNameFromPath;
/**
 * Get extension from file name string
 */
function extensionFromFileName(fileName) {
    if (typeof fileName !== 'string')
        throw new Error('Param is not a string');
    let reversed = fileName.split('').reverse();
    let extension = reversed.slice(0, reversed.indexOf('.')).reverse().join('');
    return extension;
}
exports.extensionFromFileName = extensionFromFileName;
