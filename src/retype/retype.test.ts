import retype from './retype';

const mapDef = {
  id: 'test',
  map: [
    ['A', 'a'],
    ['B', 'b'],
  ] as [string, string][],
};

describe('retype', () => {
  it('マップ定義に基づいて文字を変換する', () => {
    expect(retype('AB', mapDef)).toBe('ab');
  });

  it('複数の定義を配列で渡せる', () => {
    const def2 = { id: 'test2', map: [['C', 'c']] as [string, string][] };
    expect(retype('ABC', [mapDef, def2])).toBe('abc');
  });

  it('マップに含まれない文字はそのまま残る', () => {
    expect(retype('AXB', mapDef)).toBe('aXb');
  });

  it('空文字は空文字を返す', () => {
    expect(retype('', mapDef)).toBe('');
  });

  it('同じ定義セットはキャッシュされる', () => {
    const result1 = retype('A', mapDef);
    const result2 = retype('A', mapDef);
    expect(result1).toBe(result2);
  });
});
