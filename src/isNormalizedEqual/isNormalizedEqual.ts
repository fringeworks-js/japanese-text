import { normalizeString } from '../normalizeString';
import type { IsNormalizedEqualOptions } from './types';

/**
 * 2つの文字列が同等であることを判定する
 * @param value1 文字列1
 * @param value2 文字列2
 * @param options オプション
 * @returns
 */
export default function isNormalizedEqual(
  value1: string,
  value2: string,
  options: IsNormalizedEqualOptions = {},
): boolean {
  const { rawFirst, rawSecond } = options;
  // 比較
  const target1 = rawFirst ? value1 : normalizeString(value1, options);
  const target2 = rawSecond ? value2 : normalizeString(value2, options);
  return target1 === target2;
}
