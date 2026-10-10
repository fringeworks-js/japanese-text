import removeSpaces from './removeSpaces';

describe('removeSpaces', () => {
  it('半角スペース・全角スペースを削除する', () => {
    expect(removeSpaces('a b' + String.fromCodePoint(0x3000) + 'c')).toBe(
      'abc',
    );
  });

  it('タブ・改行・ノーブレークスペースは削除しない', () => {
    const nbsp = String.fromCodePoint(0xa0);
    expect(removeSpaces('a\tb\nc' + nbsp)).toBe('a\tb\nc' + nbsp);
  });

  it('空文字はそのまま返す', () => {
    expect(removeSpaces('')).toBe('');
  });
});
