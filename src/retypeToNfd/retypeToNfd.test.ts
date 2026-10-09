import retypeToNfd from './retypeToNfd';

describe('retypeToNfd', () => {
  it('NFC形式をNFDに変換する（濁音を分解）', () => {
    // 'が' をNFD（か＋濁点）に分解
    const nfd = retypeToNfd('が');
    expect(nfd.length).toBe(2); // 'か' + 結合濁点
    expect(nfd[0]).toBe('か'); // か
  });

  it('分解できない文字はそのまま', () => {
    expect(retypeToNfd('abc')).toBe('abc');
  });

  it('空文字', () => {
    expect(retypeToNfd('')).toBe('');
  });

  it('null', () => {
    expect(retypeToNfd(null)).toBeNull();
  });

  it('undefined', () => {
    expect(retypeToNfd(undefined)).toBeUndefined();
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(retypeToNfd.dataLast()('abc')).toBe('abc');
    });
  });
});
