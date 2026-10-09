import getShiftJisByteLength from './getShiftJisByteLength';

describe('getShiftJisByteLength', () => {
  it('1バイト文字は1、2バイト文字は2として数える', () => {
    expect(getShiftJisByteLength('abc')).toBe(3);
    expect(getShiftJisByteLength('ｱｲｳ')).toBe(3);
    expect(getShiftJisByteLength('あいう')).toBe(6);
    expect(getShiftJisByteLength('aｱあ①')).toBe(6);
  });

  it('制御文字は1バイトとして数える', () => {
    expect(getShiftJisByteLength('a\r\nb\t')).toBe(5);
  });

  it('Shift_JISで表せない文字がある場合はnullを返す', () => {
    expect(getShiftJisByteLength('a𠮷')).toBeNull();
    expect(getShiftJisByteLength('😀')).toBeNull();
    expect(getShiftJisByteLength(String.fromCodePoint(0xe000))).toBeNull();
  });

  it('空文字・null・undefinedは0を返す', () => {
    expect(getShiftJisByteLength('')).toBe(0);
    expect(getShiftJisByteLength(null)).toBe(0);
    expect(getShiftJisByteLength(undefined)).toBe(0);
  });
});
