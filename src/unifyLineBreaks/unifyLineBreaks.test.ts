import { LINE_BREAK_VARIANTS } from './constants';
import unifyLineBreaks from './unifyLineBreaks';

describe('unifyLineBreaks', () => {
  it.each(LINE_BREAK_VARIANTS)('%j を既定の文字に統一する', (char) => {
    expect(unifyLineBreaks(`a${char}b`)).toBe(`a${'\n'}b`);
  });

  it.each(LINE_BREAK_VARIANTS)('to で指定した文字に統一する: %j', (to) => {
    const all = LINE_BREAK_VARIANTS.join('x');
    expect(unifyLineBreaks(all, { to })).toBe(
      LINE_BREAK_VARIANTS.map(() => to).join('x'),
    );
    expect(unifyLineBreaks('\r\n', { to })).toBe(to);
  });

  it('CRLF は1つの改行として扱う', () => {
    expect(unifyLineBreaks('a\r\nb\rc\nd')).toBe('a\nb\nc\nd');
    expect(unifyLineBreaks('a\r\nb\rc\nd', { to: '\r\n' })).toBe(
      'a\r\nb\r\nc\r\nd',
    );
  });

  it('空文字は空文字を返す', () => {
    expect(unifyLineBreaks('')).toBe('');
  });
});
