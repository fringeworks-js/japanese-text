import convertByTable from './convertByTable';

const table = {
  id: 'test',
  entries: [
    ['A', 'a'],
    ['B', 'b'],
  ] as [string, string][],
};

describe('convertByTable', () => {
  it('変換テーブルに基づいて文字を変換する', () => {
    expect(convertByTable('AB', table)).toBe('ab');
  });

  it('複数のテーブルを配列で渡せる', () => {
    const table2 = { id: 'test2', entries: [['C', 'c']] as [string, string][] };
    expect(convertByTable('ABC', [table, table2])).toBe('abc');
  });

  it('テーブルに含まれない文字はそのまま残る', () => {
    expect(convertByTable('AXB', table)).toBe('aXb');
  });

  it('空文字は空文字を返す', () => {
    expect(convertByTable('', table)).toBe('');
  });

  it('同じテーブルの組み合わせはキャッシュされる', () => {
    const result1 = convertByTable('A', table);
    const result2 = convertByTable('A', table);
    expect(result1).toBe(result2);
  });
});
