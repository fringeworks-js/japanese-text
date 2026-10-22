import { TILDE_VARIANTS } from './constants';
import unifyTildes from './unifyTildes';

describe('unifyTildes', () => {
  it.each(TILDE_VARIANTS)('%j を既定の文字に統一する', (char) => {
    expect(unifyTildes(`a${char}b`)).toBe(`a${'～'}b`);
  });

  it.each(TILDE_VARIANTS)('to で指定した文字に統一する: %j', (to) => {
    const all = TILDE_VARIANTS.join('x');
    expect(unifyTildes(all, { to })).toBe(
      TILDE_VARIANTS.map(() => to).join('x'),
    );
    expect(unifyTildes('〜', { to })).toBe(to);
  });

  it('かなの直後かどうかに関係なく統一する', () => {
    expect(unifyTildes('1〜3 すご~い')).toBe('1～3 すご～い');
  });

  it('空文字は空文字を返す', () => {
    expect(unifyTildes('')).toBe('');
  });
});
