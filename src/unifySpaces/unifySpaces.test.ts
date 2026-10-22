import { SPACE_VARIANTS } from './constants';
import unifySpaces from './unifySpaces';

describe('unifySpaces', () => {
  it.each(SPACE_VARIANTS)('%j を既定の文字に統一する', (char) => {
    expect(unifySpaces(`a${char}b`)).toBe(`a${' '}b`);
  });

  it.each(SPACE_VARIANTS)('to で指定した文字に統一する: %j', (to) => {
    const all = SPACE_VARIANTS.join('x');
    expect(unifySpaces(all, { to })).toBe(
      SPACE_VARIANTS.map(() => to).join('x'),
    );
    expect(unifySpaces('\u3000', { to })).toBe(to);
  });

  it('タブと改行は対象外', () => {
    expect(unifySpaces('a\tb\nc')).toBe('a\tb\nc');
  });

  it('連続するスペースはまとめない', () => {
    expect(unifySpaces('a\u3000\u00a0b')).toBe('a  b');
  });

  it('空文字は空文字を返す', () => {
    expect(unifySpaces('')).toBe('');
  });
});
