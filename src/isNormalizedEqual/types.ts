import type { NormalizeStringOptions } from '../normalizeString';

/**
 * オプション
 */
export type IsNormalizedEqualOptions = NormalizeStringOptions & {
  /**
   * `left` を正規化せずに比べる（正規化済みの値と比べるときに使う）
   * @default false
   */
  rawLeft?: boolean;

  /**
   * `right` を正規化せずに比べる（正規化済みの値と比べるときに使う）
   * @default false
   */
  rawRight?: boolean;
};
