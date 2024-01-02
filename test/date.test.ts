import { getUnixEpochTimestamp, convertTimestampFromUnixEpoch, formatDateBR } from '../src';

test('Timestamp em UNIX Epoch', () => {
  expect(getUnixEpochTimestamp()).toBeGreaterThan(0);
});

test('Conversão de UNIX Epoch', () => {
  expect(convertTimestampFromUnixEpoch(getUnixEpochTimestamp())).toBeGreaterThan(0);
});

test('Formato de data BR', () => {
  expect(formatDateBR(new Date('2024-01-02'))).toBe('02/01/2024');
});
