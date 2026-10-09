import type { AmbiguousWidth } from '../../isFullWidth/types';
import _getEastAsianWidth from '../_getEastAsianWidth';

/**
 * 結合文字（濁点の結合文字やアクセント記号など）
 */
const REGEXP_MARK = /^\p{M}$/u;

/**
 * 直前の文字と合わせて表示される幅を持たない文字か
 * 結合文字、ゼロ幅接合子（ZWJ）、異体字セレクター
 */
function isAttachedChar(char: string, codePoint: number): boolean {
  return (
    codePoint === 0x200d ||
    (codePoint >= 0xfe00 && codePoint <= 0xfe0f) ||
    (codePoint >= 0xe0100 && codePoint <= 0xe01ef) ||
    REGEXP_MARK.test(char)
  );
}

/**
 * 文字列が指定の幅の文字のみで構成されているか判定する
 * 結合文字などは直前の文字の一部として扱い、判定の対象外とする
 * @param str 文字列
 * @param width 判定する幅
 * @param ambiguousAs 幅が曖昧な文字の扱い
 * @returns
 */
export default function matchesWidth(
  str: string,
  width: 'full' | 'half',
  ambiguousAs: AmbiguousWidth,
): boolean {
  if (typeof str !== 'string') {
    return false;
  }
  let hasChar = false;
  for (const char of str) {
    const codePoint = char.codePointAt(0)!;
    if (isAttachedChar(char, codePoint)) {
      continue;
    }
    hasChar = true;
    const eastAsianWidth = _getEastAsianWidth(codePoint);
    const charWidth =
      eastAsianWidth === 'narrow'
        ? 'half'
        : eastAsianWidth === 'wide'
          ? 'full'
          : eastAsianWidth === 'ambiguous'
            ? ambiguousAs
            : 'neither';
    if (charWidth !== width) {
      return false;
    }
  }
  return hasChar;
}
