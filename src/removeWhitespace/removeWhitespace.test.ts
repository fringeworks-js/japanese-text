import removeWhitespace from './removeWhitespace';

describe('removeWhitespace', () => {
  it('半角スペースを削除する', () => {
    expect(removeWhitespace('a b c')).toBe('abc');
  });

  it('全角スペースを削除する', () => {
    expect(removeWhitespace('a' + String.fromCodePoint(0x3000) + 'b')).toBe(
      'ab',
    );
  });

  it('タブを削除する', () => {
    expect(removeWhitespace('a\tb')).toBe('ab');
  });

  it('ノーブレークスペースなどの空白文字を削除する', () => {
    const spaces = String.fromCodePoint(0xa0, 0x2002, 0x2009, 0x202f, 0xfeff);
    expect(removeWhitespace('a' + spaces + 'b')).toBe('ab');
  });

  it('改行は削除しない', () => {
    const lineSeparator = String.fromCodePoint(0x2028);
    expect(removeWhitespace('a\r\nb\nc' + lineSeparator)).toBe(
      'a\r\nb\nc' + lineSeparator,
    );
  });

  it('スペースがない場合はそのまま返す', () => {
    expect(removeWhitespace('hello')).toBe('hello');
  });

  it('空文字はそのまま返す', () => {
    expect(removeWhitespace('')).toBe('');
  });
});
