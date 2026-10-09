import retypeToNoLineFeed from './retypeToNoLineFeed';

describe('retypeToNoLineFeed', () => {
  it('LFを削除する', () => {
    expect(retypeToNoLineFeed('a\nb')).toBe('ab');
  });

  it('CRLFを削除する', () => {
    expect(retypeToNoLineFeed('a\r\nb')).toBe('ab');
  });

  it('複数の改行を削除する', () => {
    expect(retypeToNoLineFeed('a\nb\nc')).toBe('abc');
  });

  it('改行がない場合はそのまま返す', () => {
    expect(retypeToNoLineFeed('hello')).toBe('hello');
  });

  it('空文字はそのまま返す', () => {
    expect(retypeToNoLineFeed('')).toBe('');
  });
  it('Unicodeの行区切り・段落区切りを削除する', () => {
    const lineSeparator = String.fromCodePoint(0x2028);
    const paragraphSeparator = String.fromCodePoint(0x2029);
    expect(
      retypeToNoLineFeed('a' + lineSeparator + 'b' + paragraphSeparator + 'c'),
    ).toBe('abc');
  });
});
