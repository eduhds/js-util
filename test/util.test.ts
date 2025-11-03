import { bytesToSize, getCreditCardBrand, getRandomHexColor, isColorLight } from '../src';

describe('Module "util"', () => {
  test('Transform bytes to size', () => {
    expect(bytesToSize(512)).toEqual('512,00 B');
    expect(bytesToSize(1024)).toEqual('1,00 KB');
    expect(bytesToSize(1024 * 1024)).toEqual('1,00 MB');
    expect(bytesToSize(1024 * 1024 + (1024 * 1024) / 2)).toEqual('1,50 MB');
    expect(bytesToSize(1024 * 1024 * 1024)).toEqual('1,00 GB');
    expect(bytesToSize(1024 * 1024 * 1024 * 1024)).toEqual('1,00 TB');
    expect(bytesToSize(1024 * 1024 * 1024 * 1024 * 2)).toEqual('2,00 TB');
  });

  test('Get Credit Card Brand', () => {
    expect(getCreditCardBrand('4111111111111111')).toEqual('Visa');
    expect(getCreditCardBrand('5555555555554444')).toEqual('Mastercard');
    expect(getCreditCardBrand('4011788388888888')).toEqual('Elo');
    expect(getCreditCardBrand('3841420130000000')).toEqual('Hipercard');
  });

  test('Get Random Hex color', () => {
    expect(getRandomHexColor()).toHaveLength(7);
    expect(getRandomHexColor()).toMatch(/^#([A-Fa-f0-9]{6})$/);
  });

  test('Is Color Light', () => {
    expect(isColorLight('#FFFFFF')).toBe(true);
    expect(isColorLight('#000000')).toBe(false);
  });
});
