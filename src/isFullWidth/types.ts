/**
 * 幅が曖昧な文字の扱い
 * - 'full': 全角として扱う
 * - 'half': 半角として扱う
 * - 'neither': 全角・半角のどちらでもないものとして扱う
 */
export type AmbiguousWidth = 'full' | 'half' | 'neither';

export type IsFullWidthOptions = {
  /**
   * 幅が曖昧な文字（East Asian Width が A の文字。`①`、`○`、`※`、`α`、`é` など）の扱い
   * @default 'full'
   */
  ambiguousAs?: AmbiguousWidth;
};
