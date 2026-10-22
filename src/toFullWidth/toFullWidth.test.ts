import toFullWidth from './toFullWidth';

describe('toFullWidth', () => {
  it('半角英字 → 全角英字', () => {
    expect(toFullWidth('abc')).toBe('ａｂｃ');
  });

  it('半角数字 → 全角数字', () => {
    expect(toFullWidth('123')).toBe('１２３');
  });

  it('半角記号 → 全角記号', () => {
    expect(toFullWidth('!')).toBe('！');
  });

  it('半角スペース → 全角スペース', () => {
    expect(toFullWidth(' ')).toBe('　');
  });

  it('全角文字はそのまま', () => {
    expect(toFullWidth('ａ')).toBe('ａ');
  });

  it('空文字', () => {
    expect(toFullWidth('')).toBe('');
  });

  describe('keepAlphabet', () => {
    it('英字を変換しない', () => {
      expect(toFullWidth('abc123', { keepAlphabet: true })).toBe('abc１２３');
    });
  });

  describe('keepNumber', () => {
    it('数字を変換しない', () => {
      expect(toFullWidth('abc123', { keepNumber: true })).toBe('ａｂｃ123');
    });
  });

  describe('keepSymbol', () => {
    it('記号を変換しない', () => {
      expect(toFullWidth('a!', { keepSymbol: true })).toBe('ａ!');
    });
  });

  describe('keepKana', () => {
    it('半角カナ（句読点・かぎ括弧・中黒を含む）を変換しない', () => {
      expect(toFullWidth('ｱ｡｢｣､･!', { keepKana: true })).toBe('ｱ｡｢｣､･！');
    });

    it('句読点・かぎ括弧・中黒は keepSymbol の対象外', () => {
      expect(toFullWidth('ｱ｡｢｣､･!', { keepSymbol: true })).toBe(
        'ア。「」、・!',
      );
    });
  });
});
