import { parseFlexibleNumber } from '../src';

describe('Module "number"', () => {
  test('parseFlexibleNumber', () => {
    expect(parseFlexibleNumber('$ 1.00')).toBe(1);
    expect(parseFlexibleNumber('$ -1.00')).toBe(-1);
    expect(parseFlexibleNumber('$ 1,000,000.50')).toBe(1000000.5);
    expect(parseFlexibleNumber('R$ 100.000,20')).toBe(100000.2);
    expect(parseFlexibleNumber('R$ -100.000,20')).toBe(-100000.2);
    expect(parseFlexibleNumber('25kg')).toBe(25);
    expect(parseFlexibleNumber('123')).toBe(123);
    expect(parseFlexibleNumber('')).toBe(0);
    expect(parseFlexibleNumber('1.000.000,000')).toBe(1000000);
    expect(parseFlexibleNumber('1.000.000')).toBe(1000000);
    expect(parseFlexibleNumber('1,000,000')).toBe(1000000);
    expect(parseFlexibleNumber('123 456 789')).toBe(123);
    expect(parseFlexibleNumber('-1.000.000')).toBe(-1000000);
    expect(parseFlexibleNumber('-1,000,000')).toBe(-1000000);
    expect(parseFlexibleNumber('1.000.000')).toBe(1000000);
    expect(parseFlexibleNumber('1.000.000')).toBe(1000000);
    expect(parseFlexibleNumber('1.000.000,50')).toBe(1000000.5);
    expect(parseFlexibleNumber('abcd')).toBe(NaN);
    expect(parseFlexibleNumber('1.325,350.123')).toBe(NaN);
    expect(parseFlexibleNumber('abcd4365dad')).toBe(4365);
    expect(parseFlexibleNumber('dsafjd 3423rwej 38dh fjha')).toBe(3423);
    expect(parseFlexibleNumber(undefined as unknown as string)).toBe(0);
    expect(parseFlexibleNumber(null as unknown as string)).toBe(0);
  });
});
