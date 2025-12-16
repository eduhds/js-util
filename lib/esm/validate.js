/**
 * Validate email address
 */
export function emailIsValid(email) {
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return reg.test(email);
}
/**
 * Validade phone number
 */
export function phoneIsValid(phone) {
    let reg = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
    return reg.test(phone);
}
/**
 * Validate CPF number
 */
export function cpfIsValid(cpf) {
    let reg = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
    return reg.test(cpf);
}
/**
 * Validate CNPJ number
 */
export function cnpjIsValid(cnpj) {
    let reg = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/;
    return reg.test(cnpj);
}
/**
 * Validate CPF or CNPJ number
 */
export function cpfcnpjIsValid(cpfcnpj) {
    let reg = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    return reg.test(cpfcnpj);
}
/**
 * Validate UUID code
 */
export function uuidIsValid(uuid) {
    const reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return reg.test(String(uuid).toLowerCase());
}
/**
 * Validate CEP number
 * @example
 * // returns true
 * cepIsValid('12345-678')
 * // returns false
 * cepIsValid('12345678')
 */
export function cepIsValid(cep) {
    let reg = /^[0-9]{5}-[0-9]{3}$/;
    return reg.test(cep);
}
