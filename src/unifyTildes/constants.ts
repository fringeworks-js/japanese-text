/**
 * 波線として扱う文字
 */
export const TILDE_VARIANTS = [
  // 全角チルダ（U+FF5E）
  '～',
  // 波ダッシュ（U+301C）
  '〜',
  // 半角チルダ
  '~',
  // WAVY DASH（U+3030）
  '〰',
  // チルダ演算子（U+223C）
  '∼',
] as const;

/**
 * 波線として扱う文字
 */
export type TildeVariant = (typeof TILDE_VARIANTS)[number];
