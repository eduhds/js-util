import { sortByKey, splitArray } from '../src';

test('Sort array of objects by key', () => {
  const people = [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }];
  expect(people.sort(sortByKey('name'))).toEqual([
    { name: 'Davi' },
    { name: 'João' },
    { name: 'Maria' },
    { name: 'Pedro' }
  ]);
});

test('Split array in chunks', () => {
  const array = ['a', 'b', 'c', 'd', 'e', 'f'];
  const chunkSize = 3;
  expect(splitArray(array, chunkSize)).toEqual([
    ['a', 'b', 'c'],
    ['d', 'e', 'f']
  ]);
});
