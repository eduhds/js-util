import {
  editAt,
  editWhere,
  filterBy,
  insert,
  insertAt,
  removeAt,
  removeWhere,
  searchedItems,
  shuffle,
  sortByKey,
  splitArray
} from '../src';

const people = [
  { name: 'Pedro', age: 20 },
  { name: 'João', age: 30 },
  { name: 'Maria', age: 40 },
  { name: 'Davi', age: 20 }
];

const fruits = ['banana', 'maçã', 'laranja', 'abacate', 'uva'];

const letters = ['a', 'b', 'c', 'd', 'e', 'f'];

describe('Module "array"', () => {
  test('Sort array of objects by key', () => {
    expect(people.sort(sortByKey('name'))).toEqual([
      people.find(p => p.name === 'Davi'),
      people.find(p => p.name === 'João'),
      people.find(p => p.name === 'Maria'),
      people.find(p => p.name === 'Pedro')
    ]);
  });

  test('Split array in chunks', () => {
    const chunkSize = 3;
    expect(splitArray(letters, chunkSize)).toEqual([
      letters.slice(0, chunkSize),
      letters.slice(chunkSize)
    ]);
  });

  test('Edit array item by index', () => {
    expect(editAt(1, () => ({ name: 'Marcos', age: 30 }), people)).toEqual(
      people.map((p, i) => (i === 1 ? { name: 'Marcos', age: 30 } : p))
    );
    expect(editAt(1, p => ({ ...p, age: 27 }), people)).toEqual(
      people.map((p, i) => (i === 1 ? { name: 'João', age: 27 } : p))
    );
    expect(editAt(3, () => 'limão', fruits)).toEqual(fruits.map((f, i) => (i === 3 ? 'limão' : f)));
  });

  test('Edit array item by predicate', () => {
    expect(editWhere(p => p.name === 'Pedro', { name: 'Sebastião', age: 26 }, people)).toEqual(
      people.map(p => (p.name === 'Pedro' ? { name: 'Sebastião', age: 26 } : p))
    );
    expect(editWhere(p => p === 'banana', 'manga', fruits)).toEqual(
      fruits.map(f => (f === 'banana' ? 'manga' : f))
    );
  });

  test('Remove array item by index', () => {
    expect(removeAt(3, people)).toEqual(people.filter((_, i) => i !== 3));
    expect(removeAt(1, fruits)).toEqual(fruits.filter((_, i) => i !== 1));
    expect(removeAt(2, letters)).toEqual(letters.filter((_, i) => i !== 2));
  });

  test('Remove array item by predicate', () => {
    expect(removeWhere(p => p.name === 'Pedro', people)).toEqual(
      people.filter(p => p.name !== 'Pedro')
    );
    expect(removeWhere(p => p === 'banana', fruits)).toEqual(fruits.filter(f => f !== 'banana'));
  });

  test('Filter array by key', () => {
    expect(filterBy(people, 'age', 20)).toEqual(people.filter(p => p.age === 20));
    expect(filterBy(fruits, 'length', 5)).toEqual(fruits.filter(f => f.length === 5));
  });

  test('Search array items', () => {
    expect(searchedItems('João', people, ['name'])).toEqual(people.filter(p => p.name === 'João'));
    expect(searchedItems('Banana', fruits)).toEqual(fruits.filter(f => f === 'banana'));
    expect(searchedItems('a', letters)).toEqual(letters.filter(l => l === 'a'));
  });

  test('Insert array item', () => {
    expect(insert('pitaya', fruits)).toEqual([...fruits, 'pitaya']);
  });

  test('Insert array item by index', () => {
    expect(insertAt(1, 'pitaya', fruits)).toEqual([
      ...fruits.slice(0, 1),
      'pitaya',
      ...fruits.slice(1)
    ]);

    expect(insertAt(0, 'pitaya', fruits)).toEqual(['pitaya', ...fruits]);
  });

  test('Shuffle array', () => {
    expect(shuffle(fruits)).toContain(fruits[Math.floor(Math.random() * fruits.length)]);
  });
});
