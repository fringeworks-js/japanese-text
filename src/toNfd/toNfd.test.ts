import toNfd from './toNfd';

describe('toNfd', () => {
  it('NFC形式をNFDに変換する（濁音を分解）', () => {
    // 'が' をNFD（か＋濁点）に分解
    const nfd = toNfd('が');
    expect(nfd.length).toBe(2); // 'か' + 結合濁点
    expect(nfd[0]).toBe('か'); // か
  });

  it('分解できない文字はそのまま', () => {
    expect(toNfd('abc')).toBe('abc');
  });

  it('空文字', () => {
    expect(toNfd('')).toBe('');
  });

  it('null', () => {
    expect(toNfd(null as any)).toBeNull();
  });

  it('undefined', () => {
    expect(toNfd(undefined as any)).toBeUndefined();
  });
});
