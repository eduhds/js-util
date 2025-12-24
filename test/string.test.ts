import {
  capitalize,
  extensionFromFileName,
  fileNameFromPath,
  formatMoneyBR,
  formatPlacaOld,
  normalizeLower,
  numberFromText,
  parseUrl,
  titleize
} from '../src';

describe('Module "string"', () => {
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

  test('parseUrl', () => {
    expect(parseUrl).toThrow('url is required');

    const url = 'https://example.com/api';

    expect(parseUrl(url).baseUrl).toEqual(url);
    expect(parseUrl(url).protocol).toEqual('https');
    expect(parseUrl(url).domain).toEqual('example.com');
    expect(parseUrl(url + '?a=1&b=2').query).toEqual({ a: '1', b: '2' });
    expect(parseUrl(url + '/$version').params).toHaveProperty('$version');

    const fullUrl = 'https://example.com/api/$version/?a=1&b=2';

    expect(parseUrl(fullUrl).baseUrl).toEqual(fullUrl.split('?')[0].slice(0, -1));
    expect(parseUrl(fullUrl).params?.['$version']).toEqual(typeof undefined);
    expect(parseUrl(fullUrl, { $version: 'v1' }).params?.['$version']).toEqual('v1');
    expect(parseUrl(fullUrl).replaceParams({ $version: 'v1' })).toEqual(
      fullUrl.split('?')[0].slice(0, -1).replace('$version', 'v1')
    );
  });
});
