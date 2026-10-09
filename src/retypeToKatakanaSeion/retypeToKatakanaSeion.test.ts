import retypeToKatakanaSeion from './retypeToKatakanaSeion';

describe('retypeToKatakanaSeion', () => {
  it('濁音をカタカナ清音に変換する', () => {
    expect(retypeToKatakanaSeion('バビブベボ')).toBe('ハヒフヘホ');
    expect(retypeToKatakanaSeion('ガギグゲゴ')).toBe('カキクケコ');
  });

  it('促音を清音に変換する', () => {
    expect(retypeToKatakanaSeion('ッ')).toBe('ツ');
  });

  it('拗音を清音に変換する', () => {
    expect(retypeToKatakanaSeion('ャュョ')).toBe('ヤユヨ');
  });

  it('disableDakuon: trueで濁音の変換を無効化する', () => {
    const result = retypeToKatakanaSeion('バッャ', { disableDakuon: true });
    expect(result).toBe('バツヤ');
  });

  it('disableSokuon: trueで促音の変換を無効化する', () => {
    const result = retypeToKatakanaSeion('バッャ', { disableSokuon: true });
    expect(result).toBe('ハッヤ');
  });

  it('disableYouon: trueで拗音の変換を無効化する', () => {
    const result = retypeToKatakanaSeion('バッャ', { disableYouon: true });
    expect(result).toBe('ハツャ');
  });

  it('半濁音をカタカナ清音に変換する', () => {
    expect(retypeToKatakanaSeion('パピプペポ')).toBe('ハヒフヘホ');
  });
});
