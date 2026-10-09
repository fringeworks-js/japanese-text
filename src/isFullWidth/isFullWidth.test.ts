import isFullWidth from './isFullWidth';

const fullWidthSpace = String.fromCodePoint(0x3000);

describe('isFullWidth', () => {
  it('全角文字はtrueを返す', () => {
    expect(isFullWidth('あいう')).toBe(true);
    expect(isFullWidth('Ａ')).toBe(true);
    expect(isFullWidth('漢字')).toBe(true);
    expect(isFullWidth('アー')).toBe(true);
    expect(isFullWidth('한글')).toBe(true);
    expect(isFullWidth(fullWidthSpace)).toBe(true);
  });

  it('絵文字は全角', () => {
    expect(isFullWidth('😀')).toBe(true);
  });

  it('半角文字が含まれるとfalseを返す', () => {
    expect(isFullWidth('abc')).toBe(false);
    expect(isFullWidth('あa')).toBe(false);
    expect(isFullWidth('ｱ')).toBe(false);
    expect(isFullWidth('あ ')).toBe(false);
  });

  it('全角・半角のどちらでもない文字が含まれるとfalseを返す', () => {
    expect(isFullWidth('あ\n')).toBe(false);
    expect(isFullWidth('あ\t')).toBe(false);
    expect(isFullWidth('ก')).toBe(false);
  });

  it('結合文字などは直前の文字の一部として扱う', () => {
    // か + 結合用濁点
    expect(isFullWidth('か' + String.fromCodePoint(0x3099))).toBe(true);
    // 家族の絵文字（ZWJで連結）
    expect(
      isFullWidth(
        String.fromCodePoint(0x1f468, 0x200d, 0x1f469, 0x200d, 0x1f467),
      ),
    ).toBe(true);
    // 結合文字のみ
    expect(isFullWidth(String.fromCodePoint(0x3099))).toBe(false);
  });

  describe('ambiguousAs', () => {
    it('デフォルトでは幅が曖昧な文字は全角', () => {
      expect(isFullWidth('①○※α')).toBe(true);
    });

    it("'half'の場合は幅が曖昧な文字は全角ではない", () => {
      expect(isFullWidth('①', { ambiguousAs: 'half' })).toBe(false);
    });

    it("'neither'の場合は幅が曖昧な文字は全角ではない", () => {
      expect(isFullWidth('①', { ambiguousAs: 'neither' })).toBe(false);
    });
  });

  it('空文字はfalseを返す', () => {
    expect(isFullWidth('')).toBe(false);
  });

  it('文字列でない場合はfalseを返す', () => {
    expect(isFullWidth(123 as any)).toBe(false);
  });
});
