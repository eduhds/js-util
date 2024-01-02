import {
  maskCpf,
  maskCnpj,
  maskPhone,
  maskCep,
  maskDate,
  maskMoney,
  maskNumber
  // TODO: maskText
} from '../src';

describe('Mask', () => {
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
  });
});
