import type { NormalizeStringOptions } from '../normalizeString';

/**
 * オプション
 */
export type IsNormalizedEqualOptions = NormalizeStringOptions & {
  /**
   * 値1の正規化を行わない
   */
  rawFirst?: boolean;

  /**
   * 値2の正規化を行わない
   */
  rawSecond?: boolean;
};
