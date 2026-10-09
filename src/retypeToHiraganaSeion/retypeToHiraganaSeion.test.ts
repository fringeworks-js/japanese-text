import retypeToHiraganaSeion from './retypeToHiraganaSeion';

describe('retypeToHiraganaSeion', () => {
  it('濁音をひらがな清音に変換する', () => {
    expect(retypeToHiraganaSeion('ばびぶべぼ')).toBe('はひふへほ');
    expect(retypeToHiraganaSeion('がぎぐげご')).toBe('かきくけこ');
  });

  it('促音を清音に変換する', () => {
    expect(retypeToHiraganaSeion('っ')).toBe('つ');
  });

  it('拗音を清音に変換する', () => {
    expect(retypeToHiraganaSeion('ゃゅょ')).toBe('やゆよ');
  });

  it('disableDakuon: trueで濁音の変換を無効化する', () => {
    const result = retypeToHiraganaSeion('ばっゃ', { disableDakuon: true });
    expect(result).toBe('ばつや');
  });

  it('disableSokuon: trueで促音の変換を無効化する', () => {
    const result = retypeToHiraganaSeion('ばっゃ', { disableSokuon: true });
    expect(result).toBe('はっや');
  });

  it('disableYouon: trueで拗音の変換を無効化する', () => {
    const result = retypeToHiraganaSeion('ばっゃ', { disableYouon: true });
    expect(result).toBe('はつゃ');
  });
});
