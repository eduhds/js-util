/**
 * Return as 000.000.000-00
 */
export function maskCpf(text: string) {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

/**
 * Return as 00.000.000/0000-00
 */
export function maskCnpj(text: string) {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

/**
 * Return as (00) 0000-0000 or (00) 00000-0000
 */
export function maskPhone(text: string) {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
}

/**
 * Return as 00000-000
 */
export function maskCep(text: string) {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
}

/**
 * Return as 00/00/0000
 */
export function maskDate(text: string) {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1');
}

/**
 * Return as R$ 0,00
 */
export function maskMoney(text: string) {
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

/**
 * Return numbers
 */
export function maskNumber(text: string) {
  return text.replace(/\D/g, '');
}

/**
 * Mask text
 * @deprecated use `maskCpf`, `maskCnpj`, `maskPhone`, `maskCep`, `maskDate`, `maskMoney` or `maskNumber`
 */
export function maskText(
  maskType: 'number' | 'cpf' | 'cnpj' | 'phone' | 'cep' | 'data' | 'money',
  onChangeText: (text: string) => void
) {
  return function (text?: string) {
    text = '';
    onChangeText(text);
  };
}
