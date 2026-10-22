/**
 * 改行として扱う文字
 */
export const LINE_BREAK_VARIANTS = [
  // CRLF
  '\r\n',
  // CR
  '\r',
  // LF
  '\n',
  // 行区切り
  '\u2028',
  // 段落区切り
  '\u2029',
] as const;

/**
 * 改行として扱う文字
 */
export type LineBreakVariant = (typeof LINE_BREAK_VARIANTS)[number];
