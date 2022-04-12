import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when a object is provided', () => {
    const obj = {
      name: 'Thiago',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Thiago&profession=developer');
  });

  it('should create a valid query string, even when an array is passed as value', () => {
    const obj = {
      name: 'Thiago',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Thiago&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Thiago',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to an object', () => {
    const qs = 'name=Thiago&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Thiago',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to an object', () => {
    const qs = 'name=Thiago';

    expect(parse(qs)).toEqual({
      name: 'Thiago',
    });
  });

  it('should  convert a query string to an object taking care of comma separators', () => {
    const qs = 'name=Thiago&abilities=TDD,JS';

    expect(parse(qs)).toEqual({
      name: 'Thiago',
      abilities: ['TDD', 'JS'],
    });
  });
});
