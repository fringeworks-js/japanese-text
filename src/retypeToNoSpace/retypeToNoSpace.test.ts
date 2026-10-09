import retypeToNoSpace from './retypeToNoSpace';

describe('retypeToNoSpace', () => {
  it('半角スペース・全角スペースを削除する', () => {
    expect(retypeToNoSpace('a b' + String.fromCodePoint(0x3000) + 'c')).toBe(
      'abc',
    );
  });

  it('タブ・改行・ノーブレークスペースは削除しない', () => {
    const nbsp = String.fromCodePoint(0xa0);
    expect(retypeToNoSpace('a\tb\nc' + nbsp)).toBe('a\tb\nc' + nbsp);
  });

  it('空文字はそのまま返す', () => {
    expect(retypeToNoSpace('')).toBe('');
  });
});
