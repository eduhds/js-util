import {
  maskCpf,
  maskCnpj,
  maskPhone,
  maskCep,
  maskDate,
  maskMoney,
  maskNumber,
  maskCreditCard,
  maskNumberDecimals
} from '../src';

describe('Module "mask"', () => {
  test('Mask cpf', () => {
    expect(maskCpf('12345678901')).toBe('123.456.789-01');
  });

  test('Mask cnpj', () => {
    expect(maskCnpj('12345678901234')).toBe('12.345.678/9012-34');
  });

  test('Mask phone', () => {
    expect(maskPhone('11999999999')).toBe('(11) 99999-9999');
    expect(maskPhone('1199999999')).toBe('(11) 9999-9999');
  });

  test('Mask cep', () => {
    expect(maskCep('12345678')).toBe('12345-678');
  });

  test('Mask date', () => {
    expect(maskDate('02012024')).toBe('02/01/2024');
  });

  test('Mask money', () => {
    expect(maskMoney('12345')).toBe('R$ 123,45');
  });

  test('Mask number', () => {
    expect(maskNumber('a1#$2/?3|xD45,oZ')).toBe('12345');
    expect(maskNumber('aa4s2s wf95sw ')).toBe('4295');
  });

  test('Mask Credit Card', () => {
    expect(maskCreditCard('1234567890123456')).toBe('1234 5678 9012 3456');
  });

  test('Mask number with specified decimals', () => {
    expect(maskNumberDecimals('a1#$2/?3|xD45,oZ', { decimals: 2 })).toBe('123,45');
    expect(maskNumberDecimals('aa4s2s wf95sw ', { decimals: 3 })).toBe('4,295');

    expect(maskNumberDecimals('0', { decimals: 1 })).toBe('0,0');
    expect(maskNumberDecimals('00', { decimals: 1 })).toBe('0,0');
    expect(maskNumberDecimals('000', { decimals: 1 })).toBe('0,0');
    expect(maskNumberDecimals('000', { decimals: 1 })).toBe('0,0');
    expect(maskNumberDecimals('0000', { decimals: 1 })).toBe('0,0');
    expect(maskNumberDecimals('123456', { decimals: 1 })).toBe('12345,6');
    expect(maskNumberDecimals('0000', { decimals: 1, separator: '.' })).toBe('0.0');
    expect(maskNumberDecimals('123456', { decimals: 1, separator: '.' })).toBe('12345.6');

    expect(maskNumberDecimals('0', { decimals: 2 })).toBe('0,00');
    expect(maskNumberDecimals('00', { decimals: 2 })).toBe('0,00');
    expect(maskNumberDecimals('000', { decimals: 2 })).toBe('0,00');
    expect(maskNumberDecimals('000', { decimals: 2 })).toBe('0,00');
    expect(maskNumberDecimals('0000', { decimals: 2 })).toBe('0,00');
    expect(maskNumberDecimals('123456', { decimals: 2 })).toBe('1234,56');
    expect(maskNumberDecimals('0000', { decimals: 2, separator: '.' })).toBe('0.00');
    expect(maskNumberDecimals('123456', { decimals: 2, separator: '.' })).toBe('1234.56');

    expect(maskNumberDecimals('0', { decimals: 3 })).toBe('0,000');
    expect(maskNumberDecimals('00', { decimals: 3 })).toBe('0,000');
    expect(maskNumberDecimals('000', { decimals: 3 })).toBe('0,000');
    expect(maskNumberDecimals('000', { decimals: 3 })).toBe('0,000');
    expect(maskNumberDecimals('0000', { decimals: 3 })).toBe('0,000');
    expect(maskNumberDecimals('123456', { decimals: 3 })).toBe('123,456');
    expect(maskNumberDecimals('0000', { decimals: 3, separator: '.' })).toBe('0.000');
    expect(maskNumberDecimals('123456', { decimals: 3, separator: '.' })).toBe('123.456');

    expect(maskNumberDecimals('0')).toBe('0,0');
    expect(maskNumberDecimals('0', { decimals: 0 })).toBe('0,0');
    expect(maskNumberDecimals('0', { decimals: -1 })).toBe('0,0');
    expect(maskNumberDecimals('0', { decimals: 0, separator: '.' })).toBe('0.0');
    expect(maskNumberDecimals('0', { decimals: -1, separator: '.' })).toBe('0.0');

    expect(maskNumberDecimals('1234', { decimals: 2, withThousands: true })).toBe('12,34');
    expect(maskNumberDecimals('12345', { decimals: 2, withThousands: true })).toBe('123,45');
    expect(maskNumberDecimals('123456', { decimals: 2, withThousands: true })).toBe('1.234,56');
    expect(maskNumberDecimals('1234567', { decimals: 2, withThousands: true })).toBe('12.345,67');
    expect(maskNumberDecimals('12345678', { decimals: 2, withThousands: true })).toBe('123.456,78');
    expect(maskNumberDecimals('123456789', { decimals: 2, withThousands: true })).toBe(
      '1.234.567,89'
    );
  });
});
