import toKatakana from './toKatakana';

describe('toKatakana', () => {
  it('ひらがな → カタカナ', () => {
    expect(toKatakana('あいうえお')).toBe('アイウエオ');
  });

  it('カタカナはそのまま', () => {
    expect(toKatakana('アイウエオ')).toBe('アイウエオ');
  });

  it('濁音のひらがな → カタカナ', () => {
    expect(toKatakana('がぎぐげご')).toBe('ガギグゲゴ');
  });

  it('空文字', () => {
    expect(toKatakana('')).toBe('');
  });

  it('混合文字列', () => {
    expect(toKatakana('あいうabcエオ')).toBe('アイウabcエオ');
  });

  it('全てのひらがなを対応するカタカナに変換する', () => {
    expect(toKatakana('ばびぶべぼぱぴぷぺぽ')).toBe('バビブベボパピプペポ');
    expect(toKatakana('なにぬねの')).toBe('ナニヌネノ');
  });
});
