import { HYPHEN_VARIANTS } from './constants';
import unifyHyphens from './unifyHyphens';

describe('unifyHyphens', () => {
  it.each(HYPHEN_VARIANTS)('かなの直後でない %s をハイフンにする', (char) => {
    expect(unifyHyphens(`1${char}2`)).toBe('1-2');
    expect(unifyHyphens(`A${char}`)).toBe('A-');
    expect(unifyHyphens(`${char}x`)).toBe('-x');
  });

  it('郵便番号・電話番号の長音記号をハイフンにする', () => {
    expect(unifyHyphens('123ー4567')).toBe('123-4567');
    expect(unifyHyphens('03ｰ1234ｰ5678')).toBe('03-1234-5678');
  });

  it('かなの直後のものは長音としてそのまま残す', () => {
    expect(unifyHyphens('サーバ サ―バ メ-ル')).toBe('サーバ サ―バ メ-ル');
    expect(unifyHyphens('ｻｰﾊﾞ ｶﾞ-')).toBe('ｻｰﾊﾞ ｶﾞ-');
  });

  it('かなの直後の並びに含まれるものは長音として残す', () => {
    expect(unifyHyphens('サ〜－')).toBe('サ〜－');
  });

  it('波線と罫線はハイフンにしない', () => {
    expect(unifyHyphens('1〜2 ──')).toBe('1〜2 ──');
    expect(unifyHyphens('1〜－2')).toBe('1〜-2');
  });

  it('to で統一後の文字を指定できる', () => {
    expect(unifyHyphens('1-2－3', { to: '－' })).toBe('1－2－3');
  });

  it('always の場合は、かなの直後も含めてすべてハイフンにする', () => {
    expect(unifyHyphens('サーバ 1－2', { always: true })).toBe('サ-バ 1-2');
  });

  it('2回適用しても結果が変わらない', () => {
    for (const to of HYPHEN_VARIANTS) {
      for (const always of [false, true]) {
        const options = { to, always };
        const once = unifyHyphens('サ―バ 123ー4567 ｻｰ1ｰ2 〜－', options);
        expect(unifyHyphens(once, options)).toBe(once);
      }
    }
  });

  it('空文字は空文字を返す', () => {
    expect(unifyHyphens('')).toBe('');
  });
});
