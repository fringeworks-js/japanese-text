import toHiragana from './toHiragana';

describe('toHiragana', () => {
  it('カタカナ → ひらがな', () => {
    expect(toHiragana('アイウエオ')).toBe('あいうえお');
  });

  it('ひらがなはそのまま', () => {
    expect(toHiragana('あいうえお')).toBe('あいうえお');
  });

  it('濁音のカタカナ → ひらがな', () => {
    expect(toHiragana('ガギグゲゴ')).toBe('がぎぐげご');
  });

  it('空文字', () => {
    expect(toHiragana('')).toBe('');
  });

  it('混合文字列', () => {
    expect(toHiragana('アイウabcえお')).toBe('あいうabcえお');
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(toHiragana.dataLast()('アイウ')).toBe('あいう');
    });
  });

  it('全てのカタカナを対応するひらがなに変換する', () => {
    expect(toHiragana('バビブベボパピプペポ')).toBe('ばびぶべぼぱぴぷぺぽ');
    expect(toHiragana('ナニヌネノ')).toBe('なにぬねの');
  });
});
