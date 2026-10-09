import retypeToKatakana from './retypeToKatakana';

describe('retypeToKatakana', () => {
  it('ひらがな → カタカナ', () => {
    expect(retypeToKatakana('あいうえお')).toBe('アイウエオ');
  });

  it('カタカナはそのまま', () => {
    expect(retypeToKatakana('アイウエオ')).toBe('アイウエオ');
  });

  it('濁音のひらがな → カタカナ', () => {
    expect(retypeToKatakana('がぎぐげご')).toBe('ガギグゲゴ');
  });

  it('空文字', () => {
    expect(retypeToKatakana('')).toBe('');
  });

  it('混合文字列', () => {
    expect(retypeToKatakana('あいうabcエオ')).toBe('アイウabcエオ');
  });

  it('全てのひらがなを対応するカタカナに変換する', () => {
    expect(retypeToKatakana('ばびぶべぼぱぴぷぺぽ')).toBe(
      'バビブベボパピプペポ',
    );
    expect(retypeToKatakana('なにぬねの')).toBe('ナニヌネノ');
  });
});
