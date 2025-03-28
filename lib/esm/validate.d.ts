/**
 * Validate email address
 */
export declare function emailIsValid(email: string): boolean;
/**
 * Validade phone number
 */
export declare function phoneIsValid(phone: string): boolean;
/**
 * Validate CPF number
 */
export declare function cpfIsValid(cpf: string): boolean;
/**
 * Validate CNPJ number
 */
export declare function cnpjIsValid(cnpj: string): boolean;
/**
 * Validate CPF or CNPJ number
 */
export declare function cpfcnpjIsValid(cpfcnpj: string): boolean;
/**
 * Validate UUID code
 */
export declare function uuidIsValid(uuid: string): boolean;
/**
 * Validate CEP number
 * @example
 * // returns true
 * cepIsValid('12345-678')
 * // returns false
 * cepIsValid('12345678')
 */
export declare function cepIsValid(cep: string): boolean;
