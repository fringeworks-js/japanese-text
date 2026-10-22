/**
 * 二重引用符として扱う文字
 */
export const DOUBLE_QUOTE_VARIANTS = [
  // 半角の二重引用符
  '"',
  // 全角の二重引用符
  '＂',
  // 左二重引用符
  '“',
  // 右二重引用符
  '”',
  // 下付きの二重引用符
  '„',
  // 逆向きの二重引用符
  '‟',
  // ダブルミニュート（開き）
  '〝',
  // ダブルミニュート（閉じ、下付き）
  '〟',
  // ダブルミニュート（閉じ）
  '〞',
] as const;

/**
 * 二重引用符として扱う文字
 */
export type DoubleQuoteVariant = (typeof DOUBLE_QUOTE_VARIANTS)[number];
