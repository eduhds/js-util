import {
  formatMoneyBR,
  formatPlacaOld,
  normalizeLower,
  capitalize,
  numberFromText,
  fileNameFromPath,
  extensionFromFileName,
  titleize
} from '../src';

describe('string', () => {
  test('formatMoneyBR', () => {
    expect(formatMoneyBR(100000)).toBe('100.000,00');
  });

  test('formatPlacaOld', () => {
    expect(formatPlacaOld('ABC1234')).toBe('ABC-1234');
  });

  test('normalizeLower', () => {
    expect(normalizeLower('ÃBÇDÉ')).toBe('abcde');
  });

  test('capitalize', () => {
    expect(capitalize('')).toBe('');
    expect(capitalize('abcde')).toBe('Abcde');
    expect(capitalize('Abcde')).toBe('Abcde');
    expect(capitalize('abcde efgh')).toBe('Abcde efgh');
    expect(capitalize('abcde Efgh')).toBe('Abcde efgh');
  });

  test('titleize', () => {
    expect(titleize('')).toBe('');
    expect(titleize('abcde')).toBe('Abcde');
    expect(titleize('Abcde')).toBe('Abcde');
    expect(titleize('abcde efgh')).toBe('Abcde Efgh');
    expect(titleize('abcde Efgh')).toBe('Abcde Efgh');
  });

  test('numberFromText', () => {
    expect(numberFromText('ABC1234')).toBe(1234);
  });

  test('fileNameFromPath', () => {
    expect(fileNameFromPath('/path/to/file.txt')).toBe('file.txt');
  });

  test('extensionFromFileName', () => {
    expect(extensionFromFileName('file.txt')).toBe('txt');
  });
});
