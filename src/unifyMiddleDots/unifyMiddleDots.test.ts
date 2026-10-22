import { MIDDLE_DOT_VARIANTS } from './constants';
import unifyMiddleDots from './unifyMiddleDots';

describe('unifyMiddleDots', () => {
  it.each(MIDDLE_DOT_VARIANTS)('%j を既定の文字に統一する', (char) => {
    expect(unifyMiddleDots(`a${char}b`)).toBe(`a${'・'}b`);
  });

  it.each(MIDDLE_DOT_VARIANTS)('to で指定した文字に統一する: %j', (to) => {
    const all = MIDDLE_DOT_VARIANTS.join('x');
    expect(unifyMiddleDots(all, { to })).toBe(
      MIDDLE_DOT_VARIANTS.map(() => to).join('x'),
    );
    expect(unifyMiddleDots('･', { to })).toBe(to);
  });

  it('外国人名の区切りを統一する', () => {
    expect(unifyMiddleDots('ジョン·スミス')).toBe('ジョン・スミス');
  });

  it('空文字は空文字を返す', () => {
    expect(unifyMiddleDots('')).toBe('');
  });
});
