import isNormalizedEqual from './isNormalizedEqual';

describe('isNormalizedEqual', () => {
  it('同じ文字列はtrueを返す', () => {
    expect(isNormalizedEqual('hello', 'hello')).toBe(true);
  });

  it('異なる文字列はfalseを返す', () => {
    expect(isNormalizedEqual('hello', 'world')).toBe(false);
  });

  it('normalizeStringで正規化した結果が一致すればtrue', () => {
    expect(
      isNormalizedEqual('ＡＢＣＤ', 'ABCD', { ignoreCompatibility: true }),
    ).toBe(true);
  });

  it('大文字・小文字を無視する', () => {
    expect(isNormalizedEqual('Hello', 'hello', { ignoreCase: true })).toBe(
      true,
    );
  });

  it('rawLeft: true で left は正規化しない', () => {
    expect(
      isNormalizedEqual('Hello', 'hello', { ignoreCase: true, rawLeft: true }),
    ).toBe(false);
  });

  it('rawRight: true で right は正規化しない', () => {
    expect(
      isNormalizedEqual('hello', 'Hello', { ignoreCase: true, rawRight: true }),
    ).toBe(false);
  });

  it('正規化済みの値と比べるときは、その側を正規化しない', () => {
    // 正規化済みの値（ignoreCase で小文字になったもの）と比べる
    expect(
      isNormalizedEqual('HELLO', 'hello', { ignoreCase: true, rawRight: true }),
    ).toBe(true);
  });
});
