import isShiftJisDoubleByte from './isShiftJisDoubleByte';

describe('isShiftJisDoubleByte', () => {
  it('2バイト文字のみの場合はtrueを返す', () => {
    expect(isShiftJisDoubleByte('あいうアイウ漢字')).toBe(true);
    expect(isShiftJisDoubleByte('ＡＢＣ１２３')).toBe(true);
    expect(isShiftJisDoubleByte(String.fromCodePoint(0x3000))).toBe(true);
    expect(isShiftJisDoubleByte('αДー※♪')).toBe(true);
  });

  it('Windows-31Jの拡張文字はtrueを返す', () => {
    expect(isShiftJisDoubleByte('①㈱Ⅰ髙')).toBe(true);
    expect(isShiftJisDoubleByte('～－')).toBe(true);
  });

  it('1バイト文字が含まれるとfalseを返す', () => {
    expect(isShiftJisDoubleByte('あa')).toBe(false);
    expect(isShiftJisDoubleByte('ｱ')).toBe(false);
  });

  it('Shift_JISで表せない文字が含まれるとfalseを返す', () => {
    expect(isShiftJisDoubleByte('𠮷')).toBe(false);
    expect(isShiftJisDoubleByte('😀')).toBe(false);
    expect(isShiftJisDoubleByte('한')).toBe(false);
    // 波ダッシュ（U+301C）・マイナス記号（U+2212）はWindows-31Jでは表せない
    expect(isShiftJisDoubleByte('〜')).toBe(false);
    expect(isShiftJisDoubleByte('−')).toBe(false);
  });

  it('ユーザー定義領域（外字）はfalseを返す', () => {
    expect(isShiftJisDoubleByte(String.fromCodePoint(0xe000))).toBe(false);
  });

  it('空文字はfalseを返す', () => {
    expect(isShiftJisDoubleByte('')).toBe(false);
  });

  it('文字列でない場合はfalseを返す', () => {
    expect(isShiftJisDoubleByte(123 as any)).toBe(false);
  });
});
