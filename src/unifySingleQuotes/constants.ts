/**
 * 一重引用符として扱う文字
 */
export const SINGLE_QUOTE_VARIANTS = [
  // 半角の一重引用符（アポストロフィ）
  "'",
  // 全角の一重引用符
  '＇',
  // 左一重引用符
  '‘',
  // 右一重引用符
  '’',
  // 下付きの一重引用符
  '‚',
  // 逆向きの一重引用符
  '‛',
] as const;

/**
 * 一重引用符として扱う文字
 */
export type SingleQuoteVariant = (typeof SINGLE_QUOTE_VARIANTS)[number];
