import retypeToNfc from './retypeToNfc';

describe('retypeToNfc', () => {
  it('NFD形式をNFCに変換する', () => {
    // 'が' をNFD（か＋濁点）からNFCに変換
    const nfd = 'が'; // か + 結合濁点
    expect(retypeToNfc(nfd)).toBe('が');
  });

  it('既にNFCの文字はそのまま', () => {
    expect(retypeToNfc('あいう')).toBe('あいう');
  });

  it('空文字', () => {
    expect(retypeToNfc('')).toBe('');
  });

  it('null', () => {
    expect(retypeToNfc(null)).toBeNull();
  });

  it('undefined', () => {
    expect(retypeToNfc(undefined)).toBeUndefined();
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(retypeToNfc.dataLast()('あいう')).toBe('あいう');
    });
  });
});
