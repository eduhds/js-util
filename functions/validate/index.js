/**
 * Validate email address
 * @param {string} email
 * @returns boolean
 */
function emailIsValid(email) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
}

/**
 * Validade phone number
 * @param {string} phone
 * @returns boolean
 */
function phoneIsValid(phone) {
  let reg = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
  return reg.test(phone);
}

/**
 * Validate CPF number
 * @param {string} cpf
 * @returns boolean
 */
function cpfIsValid(cpf) {
  let reg = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
  return reg.test(cpf);
}

/**
 * Validate CNPJ number
 * @param {string} cnpj
 * @returns boolean
 */
function cnpjIsValid(cnpj) {
  let reg = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/;
  return reg.test(cnpj);
}

/**
 * Validate CPF or CNPJ number
 * @param {string} cpfcnpj
 * @returns boolean
 */
function cpfcnpjIsValid(cpfcnpj) {
  let reg =
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
  return reg.test(cpfcnpj);
}

/**
 * Validate UUID code
 * @param {string} uuid
 * @returns boolean
 */
function uuidIsValid(uuid) {
  const reg =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return re.test(String(uuid).toLowerCase());
}

module.exports = {
  emailIsValid,
  phoneIsValid,
  cpfIsValid,
  cnpjIsValid,
  cpfcnpjIsValid,
  uuidIsValid,
};
