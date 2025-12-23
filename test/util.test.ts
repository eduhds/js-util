import { bytesToSize, getCreditCardBrand, getRandomHexColor, http, isColorLight } from '../src';

describe('Module "util"', () => {
  test('Transform bytes to size', () => {
    expect(bytesToSize(512)).toEqual('512,00 B');
    expect(bytesToSize(1024)).toEqual('1,00 KB');
    expect(bytesToSize(1024 * 1024)).toEqual('1,00 MB');
    expect(bytesToSize(1024 * 1024 + (1024 * 1024) / 2)).toEqual('1,50 MB');
    expect(bytesToSize(1024 * 1024 * 1024)).toEqual('1,00 GB');
    expect(bytesToSize(1024 * 1024 * 1024 * 1024)).toEqual('1,00 TB');
    expect(bytesToSize(1024 * 1024 * 1024 * 1024 * 2)).toEqual('2,00 TB');
  });

  test('Get Credit Card Brand', () => {
    expect(getCreditCardBrand('4111111111111111')).toEqual('Visa');
    expect(getCreditCardBrand('5555555555554444')).toEqual('Mastercard');
    expect(getCreditCardBrand('4011788388888888')).toEqual('Elo');
    expect(getCreditCardBrand('3841420130000000')).toEqual('Hipercard');
  });

  test('Get Random Hex color', () => {
    expect(getRandomHexColor()).toHaveLength(7);
    expect(getRandomHexColor()).toMatch(/^#([A-Fa-f0-9]{6})$/);
  });

  test('Is Color Light', () => {
    expect(isColorLight('#FFFFFF')).toBe(true);
    expect(isColorLight('#000000')).toBe(false);
  });

  test('Http', async () => {
    expect(http().url).toThrow('url is required');

    const exampleApi = http()
      .url('https://example.com/api/$version/?a=1&b=2', ['$version', 'v1'])
      .headers(['Accept', 'application/json'], ['Content-Type', 'application/json']);

    expect(exampleApi._baseUrl).toEqual('https://example.com/api/v1');
    expect(exampleApi._protocol).toEqual('https');
    expect(exampleApi._domain).toEqual('example.com');
    expect(exampleApi._query).toEqual({ a: '1', b: '2' });
    expect(exampleApi._params).toHaveProperty('$version');
    expect(exampleApi._headers).toEqual({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    expect(exampleApi.routes(['users', 'user', 'user/$id']).users.get).toBeInstanceOf(Function);
    expect(exampleApi.routes(['users', 'user', 'user/$id']).user.get).toBeInstanceOf(Function);
    expect(exampleApi.routes(['users', 'user', 'user/$id']).user.$id.get).toBeInstanceOf(Function);

    const todoApi = http()
      .url('https://api.freeapi.app/api/v1')
      .routes([
        'public/quotes/quote/random',
        'todos',
        'todos/$todoId',
        'todos/toggle/status/$todoId'
      ]);

    expect(await (await todoApi.public.quotes.quote.random.get()).json()).toMatchObject({
      message: 'Quote fetched successfully',
      success: true
    });

    expect(await (await todoApi.todos.get()).json()).toMatchObject({
      message: 'Todos fetched successfully',
      success: true
    });

    const res = await (
      await todoApi.todos
        .headers([['Content-Type', 'application/json']])
        .body(JSON.stringify({ description: 'Some description', title: 'Some title' }))
        .post()
    ).json();
    expect(res).toMatchObject({
      message: 'Todo created successfully',
      success: true
    });

    expect(await (await todoApi.todos.$todoId.get(['$todoId', res.data._id])).json()).toMatchObject(
      {
        message: 'Todo fetched successfully',
        success: true
      }
    );

    expect(
      await (await todoApi.todos.toggle.status.$todoId.patch(['$todoId', res.data._id])).json()
    ).toMatchObject({
      message: 'done',
      success: true
    });

    expect(
      await (
        await todoApi.todos.$todoId
          .body(JSON.stringify({ description: 'Other description', title: 'Other title' }))
          .patch(['$todoId', res.data._id])
      ).json()
    ).toMatchObject({
      message: 'Todo updated successfully',
      success: true
    });

    expect(
      await (await todoApi.todos.$todoId.delete(['$todoId', res.data._id])).json()
    ).toMatchObject({
      message: 'Todo deleted successfully',
      success: true
    });
  }, 20000);
});
