/**
 * スペースとして扱う文字
 */
export const SPACE_VARIANTS = [
  // 半角スペース
  ' ',
  // 全角スペース
  '\u3000',
  // ノーブレークスペース
  '\u00a0',
  // オガム文字のスペース
  '\u1680',
  // EN QUAD
  '\u2000',
  // EM QUAD
  '\u2001',
  // EN SPACE
  '\u2002',
  // EM SPACE
  '\u2003',
  // THREE-PER-EM SPACE
  '\u2004',
  // FOUR-PER-EM SPACE
  '\u2005',
  // SIX-PER-EM SPACE
  '\u2006',
  // FIGURE SPACE
  '\u2007',
  // PUNCTUATION SPACE
  '\u2008',
  // THIN SPACE
  '\u2009',
  // HAIR SPACE
  '\u200a',
  // 幅の狭いノーブレークスペース
  '\u202f',
  // 数式用のスペース
  '\u205f',
] as const;

/**
 * スペースとして扱う文字
 */
export type SpaceVariant = (typeof SPACE_VARIANTS)[number];
