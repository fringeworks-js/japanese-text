import _matchesWidth from '../_internal/_matchesWidth';
import type { IsHalfWidthOptions } from './types';

/**
 * 文字列が半角の文字のみで構成されているか判定する
 *
 * Unicode の East Asian Width（UAX #11）が Na（Narrow）・H（Halfwidth）の文字を半角とする。
 * 結合文字・ゼロ幅接合子・異体字セレクターは直前の文字の一部として扱う。
 * 空文字の場合はfalse
 * @param str 文字列
 * @param options オプション
 * @returns
 */
export default function isHalfWidth(
  str: string,
  options: IsHalfWidthOptions = {},
): boolean {
  const { ambiguousAs = 'full' } = options;
  return _matchesWidth(str, 'half', ambiguousAs);
}
