import {
  emailIsValid,
  phoneIsValid,
  cpfIsValid,
  cnpjIsValid,
  cpfcnpjIsValid,
  uuidIsValid,
  cepIsValid
} from '../src';

describe('validate', () => {
  test('emailIsValid', () => {
    expect(emailIsValid('')).toBe(false);
    expect(emailIsValid('a')).toBe(false);
    expect(emailIsValid('a@')).toBe(false);
    expect(emailIsValid('123')).toBe(false);
    expect(emailIsValid('abc@b.com')).toBe(true);
  });

  test('phoneIsValid', () => {
    expect(phoneIsValid('')).toBe(false);
    expect(phoneIsValid('a')).toBe(false);
    expect(phoneIsValid('a@')).toBe(false);
    expect(phoneIsValid('123')).toBe(false);
    expect(phoneIsValid('91245-6789')).toBe(true);
  });

  test('cpfIsValid', () => {
    expect(cpfIsValid('')).toBe(false);
    expect(cpfIsValid('a')).toBe(false);
    expect(cpfIsValid('819.983.490-04')).toBe(true);
    expect(cpfIsValid('10329901044')).toBe(true);
  });

  test('cnpjIsValid', () => {
    expect(cnpjIsValid('')).toBe(false);
    expect(cnpjIsValid('a')).toBe(false);
    expect(cnpjIsValid('62.418.900/0001-00')).toBe(true);
    expect(cnpjIsValid('62923952000134')).toBe(true);
  });

  test('cpfcnpjIsValid', () => {
    expect(cpfcnpjIsValid('')).toBe(false);
    expect(cpfcnpjIsValid('819.983.490-04')).toBe(true);
    expect(cpfcnpjIsValid('10329901044')).toBe(true);
    expect(cpfcnpjIsValid('62.418.900/0001-00')).toBe(true);
    expect(cpfcnpjIsValid('62923952000134')).toBe(true);
  });

  test('uuidIsValid', () => {
    expect(uuidIsValid('')).toBe(false);
    expect(uuidIsValid('a')).toBe(false);
    expect(uuidIsValid('abb541b7-0c1d-4b5a-9ccf-41e5b5a2650d')).toBe(true);
  });

  test('CEP is valid', () => {
    expect(cepIsValid('')).toBe(false);
    expect(cepIsValid('12345-678')).toBe(true);
    expect(cepIsValid('12345678')).toBe(false);
  });
});
