import { DOUBLE_QUOTE_VARIANTS } from './constants';
import unifyDoubleQuotes from './unifyDoubleQuotes';

describe('unifyDoubleQuotes', () => {
  it.each(DOUBLE_QUOTE_VARIANTS)('%j を既定の文字に統一する', (char) => {
    expect(unifyDoubleQuotes(`a${char}b`)).toBe(`a${'"'}b`);
  });

  it.each(DOUBLE_QUOTE_VARIANTS)('to で指定した文字に統一する: %j', (to) => {
    const all = DOUBLE_QUOTE_VARIANTS.join('x');
    expect(unifyDoubleQuotes(all, { to })).toBe(
      DOUBLE_QUOTE_VARIANTS.map(() => to).join('x'),
    );
    expect(unifyDoubleQuotes('＂', { to })).toBe(to);
  });

  it('開きと閉じの引用符を統一する', () => {
    expect(unifyDoubleQuotes('“a” 〝b〟')).toBe('"a" "b"');
  });

  it('一重引用符は対象外', () => {
    expect(unifyDoubleQuotes('‘a’')).toBe('‘a’');
  });

  it('空文字は空文字を返す', () => {
    expect(unifyDoubleQuotes('')).toBe('');
  });
});
