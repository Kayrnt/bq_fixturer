import toBQFixtures from '../logic/fixturer_logic'

test('basic case with {"a":"b"}', () => {
    expect(toBQFixtures('{"a":"b"}')).toBe("WITH fixture AS (SELECT 'b' AS a)");
});

test('basic case with reserved word alias {"at":"b"}', () => {
    expect(toBQFixtures('{"at":"b"}')).toBe("WITH fixture AS (SELECT 'b' AS `at`)");
});

test('basic case with {"a":""}', () => {
    expect(toBQFixtures('{"a":""}')).toBe("WITH fixture AS (SELECT '' AS a)");
});

test('case with array with single value', () => {
    expect(toBQFixtures('{"a":["b"]}'))
        .toBe("WITH fixture AS (SELECT ['b'] AS a)");
});

test('case with array with multiple values', () => {
    expect(toBQFixtures('[{"a": 1}, {"a": 2}, {"a": 3}]'))
        .toBe("WITH fixture AS (SELECT * FROM UNNEST([STRUCT(1 AS a),STRUCT(2),STRUCT(3)]))");
});

test('case with array with multiple values and nested', () => {
    expect(toBQFixtures('{"a": {"b" : [{"c" : 1, "d" : null}, {"c" : 2, "d" : null}]}}'))
        .toBe("WITH fixture AS (SELECT STRUCT([STRUCT(1 AS c,null AS d),STRUCT(2,null)] AS b) AS a)");
});

test('case with multiple fields', () => {

    const input = `[
  {
    "id": 1,
    "name": "a"
  },
  {
    "id": 2,
    "name": "b"
  }
]`;

    const expected = `WITH fixture AS (SELECT * FROM UNNEST([STRUCT(1 AS id,'a' AS name),STRUCT(2,'b')]))`;

     expect(toBQFixtures(input)).toBe(expected);
});

test('case with character to escape {"a":"b\'s"}', () => {
    const expected = `WITH fixture AS (SELECT 'b\\\'s' AS a)`;
    expect(toBQFixtures('{"a":"b\'s"}')).toBe(expected);
});