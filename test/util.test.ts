import { bytesToSize } from '../src';

test('Transform bytes to size', () => {
  expect(bytesToSize(512)).toEqual('512,00 B');
  expect(bytesToSize(1024)).toEqual('1,00 KB');
  expect(bytesToSize(1024 * 1024)).toEqual('1,00 MB');
  expect(bytesToSize(1024 * 1024 + (1024 * 1024) / 2)).toEqual('1,50 MB');
  expect(bytesToSize(1024 * 1024 * 1024)).toEqual('1,00 GB');
  expect(bytesToSize(1024 * 1024 * 1024 * 1024)).toEqual('1,00 TB');
  expect(bytesToSize(1024 * 1024 * 1024 * 1024 * 2)).toEqual('2,00 TB');
});
