import convertByTable from './convertByTable';
import type { ConversionTable } from './types';

const table: ConversionTable = {
  entries: [
    ['A', 'a'],
    ['B', 'b'],
  ],
};

describe('convertByTable', () => {
  it('変換テーブルに基づいて文字を変換する', () => {
    expect(convertByTable('AB', table)).toBe('ab');
  });

  it('複数のテーブルを配列で渡せる', () => {
    const table2: ConversionTable = { entries: [['C', 'c']] };
    expect(convertByTable('ABC', [table, table2])).toBe('abc');
  });

  it('配列の false・null・undefined は無視する', () => {
    expect(convertByTable('AB', [false, table, null, undefined])).toBe('ab');
  });

  it('as const で定義したテーブルを渡せる', () => {
    const constTable = { entries: [['x', 'y']] } as const;
    expect(convertByTable('x', constTable)).toBe('y');
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

  it('同じ変換前の文字列は後のテーブルが優先される（順番を変えても正しく反映する）', () => {
    const toOne: ConversionTable = { entries: [['a', '1']] };
    const toTwo: ConversionTable = { entries: [['a', '2']] };
    expect(convertByTable('a', [toOne, toTwo])).toBe('2');
    expect(convertByTable('a', [toTwo, toOne])).toBe('1');
    expect(convertByTable('a', [toOne, toTwo])).toBe('2');
  });

  it('内容が同じでも別のオブジェクトのテーブルは別に扱う', () => {
    const first: ConversionTable = { entries: [['a', '1']] };
    const second: ConversionTable = { entries: [['a', '2']] };
    expect(convertByTable('a', first)).toBe('1');
    expect(convertByTable('a', second)).toBe('2');
  });
});
