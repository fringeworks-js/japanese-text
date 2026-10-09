import retypeToHiragana from './retypeToHiragana';

describe('retypeToHiragana', () => {
  it('カタカナ → ひらがな', () => {
    expect(retypeToHiragana('アイウエオ')).toBe('あいうえお');
  });

  it('ひらがなはそのまま', () => {
    expect(retypeToHiragana('あいうえお')).toBe('あいうえお');
  });

  it('濁音のカタカナ → ひらがな', () => {
    expect(retypeToHiragana('ガギグゲゴ')).toBe('がぎぐげご');
  });

  it('空文字', () => {
    expect(retypeToHiragana('')).toBe('');
  });

  it('混合文字列', () => {
    expect(retypeToHiragana('アイウabcえお')).toBe('あいうabcえお');
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(retypeToHiragana.dataLast()('アイウ')).toBe('あいう');
    });
  });

  it('全てのカタカナを対応するひらがなに変換する', () => {
    expect(retypeToHiragana('バビブベボパピプペポ')).toBe(
      'ばびぶべぼぱぴぷぺぽ',
    );
    expect(retypeToHiragana('ナニヌネノ')).toBe('なにぬねの');
  });
});
