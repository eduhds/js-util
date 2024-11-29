import { keySelect } from '../src';

describe('Module "object"', () => {
  test('keySelect', () => {
    expect(keySelect('foo', { foo: 'bar' })).toBe('bar');
    expect(keySelect(2, [10, 20, 25])).toBe(25);
  });
});
