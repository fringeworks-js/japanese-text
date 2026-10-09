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

  it('rawFirst: trueでvalue1は正規化しない', () => {
    expect(
      isNormalizedEqual('Hello', 'hello', { ignoreCase: true, rawFirst: true }),
    ).toBe(false);
  });

  it('rawSecond: trueでvalue2は正規化しない', () => {
    expect(
      isNormalizedEqual('hello', 'Hello', {
        ignoreCase: true,
        rawSecond: true,
      }),
    ).toBe(false);
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(isNormalizedEqual.dataLast('hello')('hello')).toBe(true);
    });
  });
});
