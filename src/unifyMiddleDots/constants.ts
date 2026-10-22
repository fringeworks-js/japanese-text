/**
 * 中黒として扱う文字
 */
export const MIDDLE_DOT_VARIANTS = [
  // 中黒
  '・',
  // 半角の中黒
  '･',
  // MIDDLE DOT（U+00B7）
  '·',
  // HYPHENATION POINT（U+2027）
  '‧',
  // DOT OPERATOR（U+22C5）
  '⋅',
] as const;

/**
 * 中黒として扱う文字
 */
export type MiddleDotVariant = (typeof MIDDLE_DOT_VARIANTS)[number];
