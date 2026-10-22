import toHiraganaSeion from './toHiraganaSeion';

describe('toHiraganaSeion', () => {
  it('濁音をひらがな清音に変換する', () => {
    expect(toHiraganaSeion('ばびぶべぼ')).toBe('はひふへほ');
    expect(toHiraganaSeion('がぎぐげご')).toBe('かきくけこ');
  });

  it('濁音の踊り字（ゞ）を清音の踊り字（ゝ）に変換する', () => {
    expect(toHiraganaSeion('ゞ')).toBe('ゝ');
  });

  it('促音を清音に変換する', () => {
    expect(toHiraganaSeion('っ')).toBe('つ');
  });

  it('拗音を清音に変換する', () => {
    expect(toHiraganaSeion('ゃゅょ')).toBe('やゆよ');
  });

  it('keepDakuon: trueで濁音の変換を無効化する', () => {
    const result = toHiraganaSeion('ばっゃ', { keepDakuon: true });
    expect(result).toBe('ばつや');
  });

  it('keepSokuon: trueで促音の変換を無効化する', () => {
    const result = toHiraganaSeion('ばっゃ', { keepSokuon: true });
    expect(result).toBe('はっや');
  });

  it('keepYouon: trueで拗音の変換を無効化する', () => {
    const result = toHiraganaSeion('ばっゃ', { keepYouon: true });
    expect(result).toBe('はつゃ');
  });
});
