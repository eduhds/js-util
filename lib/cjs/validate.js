"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidIsValid = exports.cpfcnpjIsValid = exports.cnpjIsValid = exports.cpfIsValid = exports.phoneIsValid = exports.emailIsValid = void 0;
/**
 * Validate email address
 */
function emailIsValid(email) {
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return reg.test(email);
}
exports.emailIsValid = emailIsValid;
/**
 * Validade phone number
 */
function phoneIsValid(phone) {
    let reg = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
    return reg.test(phone);
}
exports.phoneIsValid = phoneIsValid;
/**
 * Validate CPF number
 */
function cpfIsValid(cpf) {
    let reg = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
    return reg.test(cpf);
}
exports.cpfIsValid = cpfIsValid;
/**
 * Validate CNPJ number
 */
function cnpjIsValid(cnpj) {
    let reg = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/;
    return reg.test(cnpj);
}
exports.cnpjIsValid = cnpjIsValid;
/**
 * Validate CPF or CNPJ number
 */
function cpfcnpjIsValid(cpfcnpj) {
    let reg = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    return reg.test(cpfcnpj);
}
exports.cpfcnpjIsValid = cpfcnpjIsValid;
/**
 * Validate UUID code
 */
function uuidIsValid(uuid) {
    const reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return reg.test(String(uuid).toLowerCase());
}
exports.uuidIsValid = uuidIsValid;
