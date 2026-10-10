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

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(toFullWidth.dataLast()('abc')).toBe('ａｂｃ');
    });
  });
});
