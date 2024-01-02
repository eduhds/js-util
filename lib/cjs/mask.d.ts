/**
 * Return as 000.000.000-00
 */
export declare function maskCpf(text: string): string;
/**
 * Return as 00.000.000/0000-00
 */
export declare function maskCnpj(text: string): string;
/**
 * Return as (00) 0000-0000 or (00) 00000-0000
 */
export declare function maskPhone(text: string): string;
/**
 * Return as 00000-000
 */
export declare function maskCep(text: string): string;
/**
 * Return as 00/00/0000
 */
export declare function maskDate(text: string): string;
/**
 * Return as R$ 0,00
 */
export declare function maskMoney(text: string): string;
/**
 * Return numbers
 */
export declare function maskNumber(text: string): string;
/**
 * Mask text
 */
export declare function maskText(maskType: 'number' | 'cpf' | 'cnpj' | 'phone' | 'cep' | 'data' | 'money', onChangeText: (text: string) => void): (text?: string) => void;
