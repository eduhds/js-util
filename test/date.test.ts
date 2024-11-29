import {
  getUnixEpochTimestamp,
  convertTimestampFromUnixEpoch,
  formatDateBR,
  formatTimeBR
} from '../src';

describe('Module "date"', () => {
  test('Timestamp em UNIX Epoch', () => {
    expect(getUnixEpochTimestamp()).toBeGreaterThan(0);
  });

  test('Conversão de UNIX Epoch', () => {
    expect(convertTimestampFromUnixEpoch(getUnixEpochTimestamp())).toBeGreaterThan(0);
  });

  test('Formato de data BR', () => {
    const date = new Date();
    expect(formatDateBR(date)).toBe(
      date.getDate().toString().padStart(2, '0') +
        '/' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        date.getFullYear()
    );

    expect(formatDateBR(new Date(2012, 11, 12))).toBe('12/12/2012');
  });

  test('Formato de hora BR', () => {
    const date = new Date();
    expect(formatTimeBR(new Date(2012, 11, 12, 12, 12, 12))).toBe('12:12');
    expect(formatTimeBR(new Date(2012, 11, 12, 12, 12, 12), true)).toBe('12:12:12');
  });
});
