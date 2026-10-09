import isShiftJisSingleByte from './isShiftJisSingleByte';

describe('isShiftJisSingleByte', () => {
  it('1バイト文字のみの場合はtrueを返す', () => {
    expect(isShiftJisSingleByte('abc 123 !~')).toBe(true);
    expect(isShiftJisSingleByte('ｱｲｳｶﾞ｡')).toBe(true);
    expect(isShiftJisSingleByte('¥‾')).toBe(true);
  });

  it('2バイト文字が含まれるとfalseを返す', () => {
    expect(isShiftJisSingleByte('aあ')).toBe(false);
    expect(isShiftJisSingleByte('Ａ')).toBe(false);
  });

  it('Shift_JISで表せない文字や制御文字が含まれるとfalseを返す', () => {
    expect(isShiftJisSingleByte('aé')).toBe(false);
    expect(isShiftJisSingleByte('a\n')).toBe(false);
  });

  it('空文字はfalseを返す', () => {
    expect(isShiftJisSingleByte('')).toBe(false);
  });

  it('文字列でない場合はfalseを返す', () => {
    expect(isShiftJisSingleByte(123 as any)).toBe(false);
  });
});
