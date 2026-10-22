/**
 * 長音として扱う文字
 * 長音記号と、日本語の文章で長音の代わりに使われることが多い記号。
 * `HYPHEN_VARIANTS` の文字をすべて含む（かなの直後なら長音、それ以外ならハイフンとして扱うため）
 */
export const CHOUON_VARIANTS = [
  'ー',
  'ｰ',
  '―',
  '—',
  '‐',
  '‑',
  '‒',
  '–',
  '－',
  '﹣',
  '−',
  '-',
  '─',
  '━',
  '〜',
  '～',
  '~',
] as const;

/**
 * 長音として扱う文字
 */
export type ChouonVariant = (typeof CHOUON_VARIANTS)[number];
