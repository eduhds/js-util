/**
 * Return CPF formatted as 000.000.000-00
 * @example
 * // returns 123.456.789-01
 * maskCpf('12345678901')
 */
export declare function maskCpf(text: string): string;
/**
 * Return CNPJ formatted as 00.000.000/0000-00
 * @example
 * // returns 12.345.678/9012-34
 * maskCnpj('12345678901234')
 */
export declare function maskCnpj(text: string): string;
/**
 * Return phone formatted as (00) 0000-0000 or (00) 00000-0000
 * @example
 * // returns (00) 12345-6789
 * maskPhone('00123456789')
 */
export declare function maskPhone(text: string): string;
/**
 * Return CEP formatted as 00000-000
 * @example
 * // returns 12345-678
 * maskCep('12345678')
 */
export declare function maskCep(text: string): string;
/**
 * Return date formatted as 00/00/0000
 * @example
 * // returns 12/12/2012
 * maskDate('12122012')
 */
export declare function maskDate(text: string): string;
/**
 * Return money formatted as R$ 0,00
 * @example
 * // returns R$ 100,00
 * maskMoney('10000')
 */
export declare function maskMoney(text: string): string;
/**
 * Return only numbers
 * @example
 * // returns 123
 * maskNumber('ab12cd3')
 */
export declare function maskNumber(text: string): string;
/**
 * Mask Credit Card
 * @example
 * // returns 1234 5678 9012 3456
 * maskCreditCard('1234567890123456')
 */
export declare function maskCreditCard(text: string): string;
/**
 * Mask number with decimals
 * @example
 * // returns 1,0
 * maskNumberDecimals('1')
 * // returns 1,00
 * maskNumberDecimals('100', { decimals: 2 })
 * // returns 1.000,00
 * maskNumberDecimals('100000', { decimals: 2, withThousands: true })
 */
export declare function maskNumberDecimals(text: string, { decimals, separator, withThousands }?: {
    decimals?: number | undefined;
    separator?: string | undefined;
    withThousands?: boolean | undefined;
}): string;
/**
 * Mask text
 * @deprecated use `maskCpf`, `maskCnpj`, `maskPhone`, `maskCep`, `maskDate`, `maskMoney` or `maskNumber`
 */
export declare function maskText(maskType: 'number' | 'cpf' | 'cnpj' | 'phone' | 'cep' | 'data' | 'money', onChangeText: (text: string) => void): (text?: string) => void;
/**
 * Mask password
 * @example
 * // returns ******
 * maskPassword('123456')
 * // returns ######
 * maskPassword('123456', '#')
 */
export declare function maskPassword(text: string, token?: string): string;
