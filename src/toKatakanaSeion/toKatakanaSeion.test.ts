import toKatakanaSeion from './toKatakanaSeion';

describe('toKatakanaSeion', () => {
  it('濁音をカタカナ清音に変換する', () => {
    expect(toKatakanaSeion('バビブベボ')).toBe('ハヒフヘホ');
    expect(toKatakanaSeion('ガギグゲゴ')).toBe('カキクケコ');
  });

  it('促音を清音に変換する', () => {
    expect(toKatakanaSeion('ッ')).toBe('ツ');
  });

  it('拗音を清音に変換する', () => {
    expect(toKatakanaSeion('ャュョ')).toBe('ヤユヨ');
  });

  it('keepDakuon: trueで濁音の変換を無効化する', () => {
    const result = toKatakanaSeion('バッャ', { keepDakuon: true });
    expect(result).toBe('バツヤ');
  });

  it('keepSokuon: trueで促音の変換を無効化する', () => {
    const result = toKatakanaSeion('バッャ', { keepSokuon: true });
    expect(result).toBe('ハッヤ');
  });

  it('keepYouon: trueで拗音の変換を無効化する', () => {
    const result = toKatakanaSeion('バッャ', { keepYouon: true });
    expect(result).toBe('ハツャ');
  });

  it('半濁音をカタカナ清音に変換する', () => {
    expect(toKatakanaSeion('パピプペポ')).toBe('ハヒフヘホ');
  });
});
