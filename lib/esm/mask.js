"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskText = exports.maskNumber = exports.maskMoney = exports.maskDate = exports.maskCep = exports.maskPhone = exports.maskCnpj = exports.maskCpf = void 0;
/**
 * Return as 000.000.000-00
 */
function maskCpf(text) {
    return text
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}
exports.maskCpf = maskCpf;
/**
 * Return as 00.000.000/0000-00
 */
function maskCnpj(text) {
    return text
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}
exports.maskCnpj = maskCnpj;
/**
 * Return as (00) 0000-0000 or (00) 00000-0000
 */
function maskPhone(text) {
    return text
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1');
}
exports.maskPhone = maskPhone;
/**
 * Return as 00000-000
 */
function maskCep(text) {
    return text
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}
exports.maskCep = maskCep;
/**
 * Return as 00/00/0000
 */
function maskDate(text) {
    return text
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})\d+?$/, '$1');
}
exports.maskDate = maskDate;
/**
 * Return as R$ 0,00
 */
function maskMoney(text) {
    return text
        .replace(/\D/g, '')
        .replace(/^(\d{1})$/g, '0,0$1')
        .replace(/^(\d{2})$/g, '0,$1')
        .replace(/^(\d{1,})(\d{2})$/g, '$1,$2')
        .replace(/^00(,\d{2})$/g, '0$1')
        .replace(/^00(\d)(,\d{2})$/g, '$1$2')
        .replace(/^0(\d)(,\d{2})$/g, '$1$2')
        .replace(/^(\d{1,})(,\d{2})$/g, 'R$ $1$2');
}
exports.maskMoney = maskMoney;
/**
 * Return numbers
 */
function maskNumber(text) {
    return text.replace(/\D/g, '');
}
exports.maskNumber = maskNumber;
/**
 * Mask text
 * @deprecated use `maskCpf`, `maskCnpj`, `maskPhone`, `maskCep`, `maskDate`, `maskMoney` or `maskNumber`
 */
function maskText(maskType, onChangeText) {
    return function (text) {
        text = '';
        onChangeText(text);
    };
}
exports.maskText = maskText;
