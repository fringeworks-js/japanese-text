/**
 * 変換の種類
 * 値は`transformString`に渡す変換の種類で、キーと同じ文字列
 */
export const TransformationType = {
  toFullWidth: 'toFullWidth',
  toFullWidthAlphabet: 'toFullWidthAlphabet',
  toFullWidthNumber: 'toFullWidthNumber',
  toFullWidthSign: 'toFullWidthSign',
  toFullWidthSpace: 'toFullWidthSpace',
  toFullWidthKana: 'toFullWidthKana',
  toHalfWidth: 'toHalfWidth',
  toHalfWidthAlphabet: 'toHalfWidthAlphabet',
  toHalfWidthNumber: 'toHalfWidthNumber',
  toHalfWidthSign: 'toHalfWidthSign',
  toHalfWidthSpace: 'toHalfWidthSpace',
  toHalfWidthKana: 'toHalfWidthKana',
  toHiragana: 'toHiragana',
  toHiraganaSeion: 'toHiraganaSeion',
  toHiraganaSeionFromDakuon: 'toHiraganaSeionFromDakuon',
  toHiraganaSeionFromSokuon: 'toHiraganaSeionFromSokuon',
  toHiraganaSeionFromYouon: 'toHiraganaSeionFromYouon',
  toKatakana: 'toKatakana',
  toKatakanaSeion: 'toKatakanaSeion',
  toKatakanaSeionFromDakuon: 'toKatakanaSeionFromDakuon',
  toKatakanaSeionFromSokuon: 'toKatakanaSeionFromSokuon',
  toKatakanaSeionFromYouon: 'toKatakanaSeionFromYouon',
  removeChouon: 'removeChouon',
  removeLineBreaks: 'removeLineBreaks',
  removeWhitespace: 'removeWhitespace',
  removeSpaces: 'removeSpaces',
  toCamelCase: 'toCamelCase',
  toKebabCase: 'toKebabCase',
  toLowerCase: 'toLowerCase',
  toPascalCase: 'toPascalCase',
  toScreamingSnakeCase: 'toScreamingSnakeCase',
  toSnakeCase: 'toSnakeCase',
  toTitleCase: 'toTitleCase',
  toUpperCase: 'toUpperCase',
  toNfc: 'toNfc',
  toNfd: 'toNfd',
  toNfkc: 'toNfkc',
  toNfkd: 'toNfkd',
} as const;

/**
 * 変換の種類
 */
export type TransformationType =
  (typeof TransformationType)[keyof typeof TransformationType];
