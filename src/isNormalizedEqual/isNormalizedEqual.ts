import { normalizeString } from '../normalizeString';
import type { IsNormalizedEqualOptions } from './types';

/**
 * 2つの文字列を正規化してから、等しいか判定する
 * @param left 比べる文字列（左辺）
 * @param right 比べる文字列（右辺）
 * @param options オプション
 * @returns 正規化した2つの文字列が等しい場合は true
 */
export default function isNormalizedEqual(
  left: string,
  right: string,
  options: IsNormalizedEqualOptions = {},
): boolean {
  const { rawLeft, rawRight } = options;
  const normalizedLeft = rawLeft ? left : normalizeString(left, options);
  const normalizedRight = rawRight ? right : normalizeString(right, options);
  return normalizedLeft === normalizedRight;
}
