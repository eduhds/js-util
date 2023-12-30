/**
 * @deprecated
 */
export type MaskType = 'number' | 'cpf' | 'cnpj' | 'phone' | 'cep' | 'money';

/**
 * @deprecated
 */
export function maskCpf(text: string): string;

/**
 * @deprecated
 */
export function maskCnpj(text: string): string;

/**
 * @deprecated
 */
export function maskPhone(text: string): string;

/**
 * @deprecated
 */
export function maskCep(text: string): string;

/**
 * @deprecated
 */
export function maskDate(text: string): string;

/**
 * @deprecated
 */
export function maskMoney(text: string): string;

/**
 * @deprecated
 */
export function maskText(
	maskType: MaskType,
	onChangeText: (text?: string) => void
): (text: string) => void;
