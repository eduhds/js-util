import { getUnixEpochTimestamp, convertTimestampFromUnixEpoch, formatDateBR } from '../src';

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
});
