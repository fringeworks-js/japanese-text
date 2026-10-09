import { normalizeString } from '../normalizeString';
import type { IsNormalizedEqualOptions } from './types';

/**
 * 2つの文字列が同等であることを判定する
 * @param value1 文字列1
 * @param value2 文字列2
 * @param options オプション
 * @returns
 */
const isNormalizedEqual = (
  value1: string,
  value2: string,
  options: IsNormalizedEqualOptions = {},
): boolean => _isNormalizedEqual(value1, value2, options);
isNormalizedEqual.dataLast =
  (value2: string, options: IsNormalizedEqualOptions = {}) =>
  (value1: string): boolean =>
    _isNormalizedEqual(value1, value2, options);
export default isNormalizedEqual;

function _isNormalizedEqual(
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
