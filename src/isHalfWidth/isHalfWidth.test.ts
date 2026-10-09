import isHalfWidth from './isHalfWidth';

describe('isHalfWidth', () => {
  it('半角文字はtrueを返す', () => {
    expect(isHalfWidth('abc')).toBe(true);
    expect(isHalfWidth('123')).toBe(true);
    expect(isHalfWidth('a b')).toBe(true);
    expect(isHalfWidth('ｱｲｳ')).toBe(true);
    expect(isHalfWidth('ｶﾞ')).toBe(true);
    expect(isHalfWidth('¥₩')).toBe(true);
  });

  it('全角文字が含まれるとfalseを返す', () => {
    expect(isHalfWidth('あいう')).toBe(false);
    expect(isHalfWidth('Ａ')).toBe(false);
    expect(isHalfWidth('abc漢')).toBe(false);
    expect(isHalfWidth('a😀')).toBe(false);
  });

  it('全角・半角のどちらでもない文字が含まれるとfalseを返す', () => {
    expect(isHalfWidth('a\n')).toBe(false);
    expect(isHalfWidth('a\t')).toBe(false);
  });

  it('結合文字などは直前の文字の一部として扱う', () => {
    // e + 結合用アキュートアクセント
    expect(isHalfWidth('e' + String.fromCodePoint(0x0301))).toBe(true);
  });

  describe('ambiguousAs', () => {
    it('デフォルトでは幅が曖昧な文字は半角ではない', () => {
      expect(isHalfWidth('café')).toBe(false);
    });

    it("'half'の場合は幅が曖昧な文字は半角", () => {
      expect(isHalfWidth('café', { ambiguousAs: 'half' })).toBe(true);
    });

    it("'neither'の場合は幅が曖昧な文字は半角ではない", () => {
      expect(isHalfWidth('café', { ambiguousAs: 'neither' })).toBe(false);
    });
  });

  it('空文字はfalseを返す', () => {
    expect(isHalfWidth('')).toBe(false);
  });

  it('文字列でない場合はfalseを返す', () => {
    expect(isHalfWidth(123 as any)).toBe(false);
  });
});
