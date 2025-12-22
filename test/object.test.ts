import {
  blobToJson,
  getValueAtPath,
  jsonToBlob,
  keySelect,
  listObjectDeepKeys,
  remapProperties,
  setValueAtPath,
  splitSegmentsToObjectFields
} from '../src';

const france = {
  name: 'France',
  capital: 'Paris',
  population: 67364357,
  area: 551695,
  currency: 'Euro',
  languages: ['French'],
  region: 'Europe',
  subregion: 'Western Europe',
  flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg'
};

const user = {
  userId: 1,
  username: 'johndoe',
  email: 'johndoe@example.com',
  passwordHash: 'abc123hashedpassword',
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '1990-01-01',
    gender: 'male',
    avatarUrl: 'https://example.com/avatars/johndoe.jpg',
    bio: 'Software developer with a passion for open-source projects.'
  },
  preferences: {
    language: 'en',
    theme: 'dark',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    privacy: {
      showOnlineStatus: false,
      profileVisibility: 'friends'
    }
  },
  accountStatus: {
    isActive: true,
    lastLogin: '2025-01-10T12:45:00Z',
    createdAt: '2022-05-15T08:30:00Z'
  },
  activityLogs: [
    {
      timestamp: '2025-01-09T14:20:00Z',
      activity: 'Logged in from IP 192.168.1.10'
    },
    {
      timestamp: '2025-01-08T10:05:00Z',
      activity: 'Updated profile picture'
    }
  ]
};

describe('Module "object"', () => {
  test('keySelect', () => {
    expect(keySelect('foo', { foo: 'bar' })).toEqual('bar');
    expect(keySelect(2, [10, 20, 25])).toEqual(25);
  });

  test('Get Value at path', () => {
    expect(getValueAtPath('foo', { foo: 'bar' })).toEqual('bar');
    expect(getValueAtPath('name', france)).toEqual(france.name);
    expect(getValueAtPath('president', france)).toEqual(undefined);
    expect(getValueAtPath('languages.0', france)).toEqual(france.languages[0]);
    expect(getValueAtPath('preferences.language', user)).toEqual(user.preferences.language);
    expect(getValueAtPath('preferences.privacy.profileVisibility', user)).toEqual(
      user.preferences.privacy.profileVisibility
    );
  });

  test('Set Value at path', () => {
    expect(setValueAtPath('foo', 'rab', { foo: 'bar' })).toEqual({ foo: 'rab' });
    expect(setValueAtPath('a.b.c.d', 'e', { a: { b: { c: { d: 'f' } } } })).toEqual({
      a: { b: { c: { d: 'e' } } }
    });
    expect(setValueAtPath('name', 'Germany', france)).toEqual({
      ...france,
      name: 'Germany'
    });
    expect(setValueAtPath('preferences.privacy.profileVisibility', 'public', user)).toEqual({
      ...user,
      preferences: {
        ...user.preferences,
        privacy: {
          ...user.preferences.privacy,
          profileVisibility: 'public'
        }
      }
    });
    expect(setValueAtPath('foo.0', 'rab', { foo: ['bar'] })).toEqual({ foo: ['rab'] });
    expect(setValueAtPath('0.1.2', '3', [[, [, , '']]])).toEqual([[, [, , '3']]]);
    expect(setValueAtPath('languages.1', 'latim', france)).toEqual({
      ...france,
      languages: [france.languages[0], 'latim']
    });
  });

  test('Convert JSON object to Blob', async () => {
    const blob = await jsonToBlob({ foo: 'bar' });
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toEqual('application/json');
  });

  test('Convert JSON object to Blob', async () => {
    const blob = await jsonToBlob({ foo: 'bar' });
    const json = await blobToJson(blob);
    expect(json).toEqual({ foo: 'bar' });
  });

  test('Remap properties', () => {
    expect(remapProperties({ oof: 'bar' }, [[['oof'], 'foo']])).toEqual({ foo: 'bar' });

    const headers = {
      'content-type': 'application/json',
      accept: 'application/json'
    };

    expect(
      remapProperties(headers, [
        [['content-type'], 'Content-Type'],
        [['accept'], 'Accept']
      ])
    ).toEqual({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    expect(remapProperties(headers, [[['content-type'], 'Content-Type']], 'merge')).toEqual({
      ...headers,
      'Content-Type': 'application/json'
    });

    const user = { id_user: 1, user_id: 2, 'id-user': 3, name: 'John Doe' };

    expect(remapProperties(user, [[['id-user', 'id_user', 'user_id'], 'id']])).toEqual({
      id: user.user_id
    });

    expect(remapProperties(user, [[['id-user'], 'id']], 'merge')).toEqual({
      ...user,
      id: user['id-user']
    });
  });

  test('Split segments into object fields', () => {
    const fooBarBaz = { foo: { bar: { baz: {} } } };

    expect(splitSegmentsToObjectFields(['foo.bar.baz'])).toEqual(fooBarBaz);
    expect(splitSegmentsToObjectFields(['foo,bar,baz'], { separator: ',' })).toEqual(fooBarBaz);
    expect(splitSegmentsToObjectFields(['foo/bar/baz'], { separator: '/' })).toEqual(fooBarBaz);
    expect(splitSegmentsToObjectFields(['foo|bar|baz'], { separator: '|' })).toEqual(fooBarBaz);

    expect(splitSegmentsToObjectFields(['foo.bar.baz']).foo.bar.baz).toEqual(fooBarBaz.foo.bar.baz);

    const initialValue = { foo: { oof: null }, oof: null };

    expect(splitSegmentsToObjectFields(['foo.bar.baz'], { initialValue })).toEqual({
      ...fooBarBaz,
      ...initialValue
    });

    expect(splitSegmentsToObjectFields(['foo.bar.baz'], { initialValue }).oof).toBeNull();
    expect(splitSegmentsToObjectFields(['foo.bar.baz'], { initialValue }).foo.oof).toBeNull();

    expect(
      splitSegmentsToObjectFields(['foo.bar.baz'], { finalValue: () => 'end' }).foo.bar.baz
    ).toEqual('end');
    expect(
      splitSegmentsToObjectFields(['foo.bar.baz'], { finalValue: () => true }).foo.bar.baz
    ).toEqual(true);
    expect(
      splitSegmentsToObjectFields(['foo.bar.baz'], { finalValue: () => [] }).foo.bar.baz
    ).toEqual([]);
  });

  test('List object deep keys', () => {
    expect(listObjectDeepKeys({ foo: { bar: { baz: '' } } })).toEqual([
      ['foo', 'object'],
      ['foo.bar', 'object'],
      ['foo.bar.baz', 'string']
    ]);

    expect(
      listObjectDeepKeys({ foo: { bar: { baz: [{ oof: { rab: '' } }, '', false] } } })
    ).toEqual([
      ['foo', 'object'],
      ['foo.bar', 'object'],
      ['foo.bar.baz', 'object'],
      ['foo.bar.baz.0', 'object'],
      ['foo.bar.baz.0.oof', 'object'],
      ['foo.bar.baz.0.oof.rab', 'string'],
      ['foo.bar.baz.1', 'string'],
      ['foo.bar.baz.2', 'boolean']
    ]);

    expect(listObjectDeepKeys([1, 2, 3])).toEqual([
      ['0', 'number'],
      ['1', 'number'],
      ['2', 'number']
    ]);
  });
});
