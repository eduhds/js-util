import { editAt, editWhere, filterBy, removeAt, removeWhere, sortByKey, splitArray } from '../src';

describe('Module "array"', () => {
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

  test('Edit array item by index', () => {
    const array = [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }];
    expect(editAt(1, { name: 'Marcos' }, array)).toEqual([
      { name: 'Pedro' },
      { name: 'Marcos' },
      { name: 'Maria' },
      { name: 'Davi' }
    ]);
  });

  test('Edit array item by predicate', () => {
    const array = [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }];
    expect(editWhere(p => p.name === 'Pedro', { name: 'Sebastião' }, array)).toEqual([
      { name: 'Sebastião' },
      { name: 'João' },
      { name: 'Maria' },
      { name: 'Davi' }
    ]);
  });

  test('Remove array item by index', () => {
    const array = ['a', 'b', 'c', 'd', 'e', 'f'];
    expect(removeAt(3, array)).toEqual(['a', 'b', 'c', 'e', 'f']);
  });

  test('Remove array item by predicate', () => {
    const array = [{ name: 'Pedro' }, { name: 'João' }, { name: 'Maria' }, { name: 'Davi' }];
    expect(removeWhere(p => p.name === 'Pedro', array)).toEqual([
      { name: 'João' },
      { name: 'Maria' },
      { name: 'Davi' }
    ]);
  });

  test('Filter array by key', () => {
    const array = [
      { name: 'Pedro', age: 20 },
      { name: 'João', age: 30 },
      { name: 'Maria', age: 40 },
      { name: 'Davi', age: 20 }
    ];

    expect(filterBy(array, 'age', 20)).toEqual([
      { name: 'Pedro', age: 20 },
      { name: 'Davi', age: 20 }
    ]);
  });
});
