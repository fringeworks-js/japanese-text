import removeLineBreaks from './removeLineBreaks';

describe('removeLineBreaks', () => {
  it('LFを削除する', () => {
    expect(removeLineBreaks('a\nb')).toBe('ab');
  });

  it('CRLFを削除する', () => {
    expect(removeLineBreaks('a\r\nb')).toBe('ab');
  });

  it('複数の改行を削除する', () => {
    expect(removeLineBreaks('a\nb\nc')).toBe('abc');
  });

  it('改行がない場合はそのまま返す', () => {
    expect(removeLineBreaks('hello')).toBe('hello');
  });

  it('空文字はそのまま返す', () => {
    expect(removeLineBreaks('')).toBe('');
  });
  it('Unicodeの行区切り・段落区切りを削除する', () => {
    const lineSeparator = String.fromCodePoint(0x2028);
    const paragraphSeparator = String.fromCodePoint(0x2029);
    expect(
      removeLineBreaks('a' + lineSeparator + 'b' + paragraphSeparator + 'c'),
    ).toBe('abc');
  });
});
