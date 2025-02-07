/**
 * Return CPF formatted as 000.000.000-00
 * @example
 * // returns 123.456.789-01
 * maskCpf('12345678901')
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
 * Return CNPJ formatted as 00.000.000/0000-00
 * @example
 * // returns 12.345.678/9012-34
 * maskCnpj('12345678901234')
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
 * Return phone formatted as (00) 0000-0000 or (00) 00000-0000
 * @example
 * // returns (00) 12345-6789
 * maskPhone('00123456789')
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
 * Return CEP formatted as 00000-000
 * @example
 * // returns 12345-678
 * maskCep('12345678')
 */
export function maskCep(text: string) {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
}

/**
 * Return date formatted as 00/00/0000
 * @example
 * // returns 12/12/2012
 * maskDate('12122012')
 */
export function maskDate(text: string) {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1');
}

/**
 * Return money formatted as R$ 0,00
 * @example
 * // returns R$ 100,00
 * maskMoney('10000')
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
 * Return only numbers
 * @example
 * // returns 123
 * maskNumber('ab12cd3')
 */
export function maskNumber(text: string) {
  return text.replace(/\D/g, '');
}

/**
 * Mask Credit Card
 * @example
 * // returns 1234 5678 9012 3456
 * maskCreditCard('1234567890123456')
 */
export function maskCreditCard(text: string) {
  return text
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})\d+?$/, '$1');
}

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
export function maskNumberDecimals(
  text: string,
  { decimals = 1, separator = ',', withThousands = false } = {}
) {
  decimals = Math.max(decimals, 1);
  separator = [',', '.'].includes(separator) ? separator : ',';

  const delimiter = separator === ',' ? '.' : ',';

  text = text
    .replace(/\D/g, '')
    .replace(
      new RegExp(`^(\\d{1,${decimals}})$`, 'g'),
      s => '0'.repeat(decimals - s.length + 1) + s // pad with 0s
    )
    .replace(new RegExp(`^(\\d{1,})(\\d{${decimals}})$`, 'g'), `$1${separator}$2`)
    .replace(
      new RegExp(`^(0{1,})(\\d{1,})\\${separator}(\\d{${decimals}})`, 'g'),
      `$2${separator}$3`
    );

  if (withThousands) text = text.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${delimiter}`);

  return text;
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
