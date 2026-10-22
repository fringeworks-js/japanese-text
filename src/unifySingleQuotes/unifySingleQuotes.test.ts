import { SINGLE_QUOTE_VARIANTS } from './constants';
import unifySingleQuotes from './unifySingleQuotes';

describe('unifySingleQuotes', () => {
  it.each(SINGLE_QUOTE_VARIANTS)('%j を既定の文字に統一する', (char) => {
    expect(unifySingleQuotes(`a${char}b`)).toBe(`a${"'"}b`);
  });

  it.each(SINGLE_QUOTE_VARIANTS)('to で指定した文字に統一する: %j', (to) => {
    const all = SINGLE_QUOTE_VARIANTS.join('x');
    expect(unifySingleQuotes(all, { to })).toBe(
      SINGLE_QUOTE_VARIANTS.map(() => to).join('x'),
    );
    expect(unifySingleQuotes('＇', { to })).toBe(to);
  });

  it('開きと閉じの引用符を統一する', () => {
    expect(unifySingleQuotes('‘a’ don’t')).toBe("'a' don't");
  });

  it('二重引用符は対象外', () => {
    expect(unifySingleQuotes('“a”')).toBe('“a”');
  });

  it('空文字は空文字を返す', () => {
    expect(unifySingleQuotes('')).toBe('');
  });
});
