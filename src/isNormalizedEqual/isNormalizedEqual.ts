import { normalizeString } from '../normalizeString';
import type { IsNormalizedEqualOptions } from './types';

/**
 * 2つの文字列が同等であることを判定する
 * @param str1 文字列1
 * @param str2 文字列2
 * @param options オプション
 * @returns
 */
export default function isNormalizedEqual(
  str1: string,
  str2: string,
  options: IsNormalizedEqualOptions = {},
): boolean {
  const { rawFirst, rawSecond } = options;
  // 比較
  const target1 = rawFirst ? str1 : normalizeString(str1, options);
  const target2 = rawSecond ? str2 : normalizeString(str2, options);
  return target1 === target2;
}
