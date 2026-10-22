/**
 * ハイフンとして扱う文字
 * ハイフン・ダッシュ・マイナスの記号と、ハイフンの代わりに使われることが多い長音記号
 */
export const HYPHEN_VARIANTS = [
  '-',
  '－',
  '‐',
  '‑',
  '‒',
  '–',
  '—',
  '―',
  '﹣',
  '−',
  'ー',
  'ｰ',
] as const;

/**
 * ハイフンとして扱う文字
 */
export type HyphenVariant = (typeof HYPHEN_VARIANTS)[number];
