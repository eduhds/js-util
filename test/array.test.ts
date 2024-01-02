import { sortByKey } from '../src';

test('Sort array of objects by key', () => {
  const people = [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }];
  expect(people.sort(sortByKey('name'))).toEqual([
    { name: 'Davi' },
    { name: 'João' },
    { name: 'Maria' },
    { name: 'Pedro' }
  ]);
});
