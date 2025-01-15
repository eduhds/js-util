"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskText = exports.maskNumberDecimals = exports.maskCreditCard = exports.maskNumber = exports.maskMoney = exports.maskDate = exports.maskCep = exports.maskPhone = exports.maskCnpj = exports.maskCpf = void 0;
/**
 * Return CPF formatted as 000.000.000-00
 * @example
 * // returns 123.456.789-01
 * maskCpf('12345678901')
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
 * Return CNPJ formatted as 00.000.000/0000-00
 * @example
 * // returns 12.345.678/9012-34
 * maskCnpj('12345678901234')
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
 * Return phone formatted as (00) 0000-0000 or (00) 00000-0000
 * @example
 * // returns (00) 12345-6789
 * maskPhone('00123456789')
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
 * Return CEP formatted as 00000-000
 * @example
 * // returns 12345-678
 * maskCep('12345678')
 */
function maskCep(text) {
    return text
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}
exports.maskCep = maskCep;
/**
 * Return date formatted as 00/00/0000
 * @example
 * // returns 12/12/2012
 * maskDate('12122012')
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
 * Return money formatted as R$ 0,00
 * @example
 * // returns R$ 100,00
 * maskMoney('10000')
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
 * Return only numbers
 * @example
 * // returns 123
 * maskNumber('ab12cd3')
 */
function maskNumber(text) {
    return text.replace(/\D/g, '');
}
exports.maskNumber = maskNumber;
/**
 * Mask Credit Card
 * @example
 * // returns 1234 5678 9012 3456
 * maskCreditCard('1234567890123456')
 */
function maskCreditCard(text) {
    return text
        .replace(/\D/g, '')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})\d+?$/, '$1');
}
exports.maskCreditCard = maskCreditCard;
/**
 * Mask number with decimals
 * @example
 * // returns 1,0
 * maskNumberDecimals('1')
 * // returns 1,00
 * maskNumberDecimals('100', 2)
 */
function maskNumberDecimals(text, decimals = 1) {
    decimals = Math.max(decimals, 1);
    return text
        .replace(/\D/g, '')
        .replace(new RegExp(`^(\\d{1,${decimals}})$`, 'g'), s => '0'.repeat(decimals - s.length + 1) + s)
        .replace(new RegExp(`^(\\d{1,})(\\d{${decimals}})$`, 'g'), '$1,$2')
        .replace(new RegExp(`(0{1,})(\\d{1,}),(\\d{${decimals}})`, 'g'), '$2,$3');
}
exports.maskNumberDecimals = maskNumberDecimals;
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
