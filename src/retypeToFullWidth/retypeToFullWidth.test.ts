import retypeToFullWidth from './retypeToFullWidth';

describe('retypeToFullWidth', () => {
  it('半角英字 → 全角英字', () => {
    expect(retypeToFullWidth('abc')).toBe('ａｂｃ');
  });

  it('半角数字 → 全角数字', () => {
    expect(retypeToFullWidth('123')).toBe('１２３');
  });

  it('半角記号 → 全角記号', () => {
    expect(retypeToFullWidth('!')).toBe('！');
  });

  it('半角スペース → 全角スペース', () => {
    expect(retypeToFullWidth(' ')).toBe('　');
  });

  it('全角文字はそのまま', () => {
    expect(retypeToFullWidth('ａ')).toBe('ａ');
  });

  it('空文字', () => {
    expect(retypeToFullWidth('')).toBe('');
  });

  describe('disableAlphabet', () => {
    it('英字を変換しない', () => {
      expect(retypeToFullWidth('abc123', { disableAlphabet: true })).toBe(
        'abc１２３',
      );
    });
  });

  describe('disableNumber', () => {
    it('数字を変換しない', () => {
      expect(retypeToFullWidth('abc123', { disableNumber: true })).toBe(
        'ａｂｃ123',
      );
    });
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(retypeToFullWidth.dataLast()('abc')).toBe('ａｂｃ');
    });
  });
});
