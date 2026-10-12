import { EAST_ASIAN_WIDTH_RANGES } from './ranges';
import type { EastAsianWidth } from './types';

/**
 * コードポイントの East Asian Width の種別を取得する
 * @param codePoint コードポイント
 * @returns 種別
 */
export default function getEastAsianWidth(codePoint: number): EastAsianWidth {
  // 二分探索
  let low = 0;
  let high = EAST_ASIAN_WIDTH_RANGES.length - 1;
  while (low <= high) {
    const middle = (low + high) >>> 1;
    const [start, end, width] = EAST_ASIAN_WIDTH_RANGES[middle]!;
    if (codePoint < start) {
      high = middle - 1;
    } else if (codePoint > end) {
      low = middle + 1;
    } else {
      return width;
    }
  }
  return 'neutral';
}
