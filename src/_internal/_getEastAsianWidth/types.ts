/**
 * East Asian Width の種別
 * - 'narrow': 半角（Na: Narrow, H: Halfwidth）
 * - 'wide': 全角（W: Wide, F: Fullwidth）
 * - 'ambiguous': 文脈によって全角にも半角にもなる（A: Ambiguous）
 * - 'neutral': 東アジアの文字の幅の概念に当てはまらない（N: Neutral）
 */
export type EastAsianWidth = 'narrow' | 'wide' | 'ambiguous' | 'neutral';

/**
 * East Asian Width の範囲（開始, 終了, 種別）
 */
export type EastAsianWidthRange = readonly [
  start: number,
  end: number,
  width: Exclude<EastAsianWidth, 'neutral'>,
];
