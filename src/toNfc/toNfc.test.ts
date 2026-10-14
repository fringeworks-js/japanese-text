import toNfc from './toNfc';

describe('toNfc', () => {
  it('NFD形式をNFCに変換する', () => {
    // 'が' をNFD（か＋濁点）からNFCに変換
    const nfd = 'が'; // か + 結合濁点
    expect(toNfc(nfd)).toBe('が');
  });

  it('既にNFCの文字はそのまま', () => {
    expect(toNfc('あいう')).toBe('あいう');
  });

  it('空文字', () => {
    expect(toNfc('')).toBe('');
  });

  it('null', () => {
    expect(toNfc(null as any)).toBeNull();
  });

  it('undefined', () => {
    expect(toNfc(undefined as any)).toBeUndefined();
  });
});
