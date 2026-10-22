/**
 * 変換の種類
 * 値は`transformString`に渡す変換の種類で、キーと同じ文字列
 */
export const TransformationType = {
  toFullWidth: 'toFullWidth',
  toFullWidthAlphabet: 'toFullWidthAlphabet',
  toFullWidthNumber: 'toFullWidthNumber',
  toFullWidthSymbol: 'toFullWidthSymbol',
  toFullWidthSpace: 'toFullWidthSpace',
  toFullWidthKana: 'toFullWidthKana',
  toHalfWidth: 'toHalfWidth',
  toHalfWidthAlphabet: 'toHalfWidthAlphabet',
  toHalfWidthNumber: 'toHalfWidthNumber',
  toHalfWidthSymbol: 'toHalfWidthSymbol',
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
  unifyChouon: 'unifyChouon',
  unifyDoubleQuotes: 'unifyDoubleQuotes',
  unifyHyphens: 'unifyHyphens',
  unifyLineBreaks: 'unifyLineBreaks',
  unifyMiddleDots: 'unifyMiddleDots',
  unifySingleQuotes: 'unifySingleQuotes',
  unifySpaces: 'unifySpaces',
  unifyTildes: 'unifyTildes',
  toCamelCase: 'toCamelCase',
  toDotCase: 'toDotCase',
  toFlatCase: 'toFlatCase',
  toKebabCase: 'toKebabCase',
  toLowerCase: 'toLowerCase',
  toPascalCase: 'toPascalCase',
  toScreamingSnakeCase: 'toScreamingSnakeCase',
  toSentenceCase: 'toSentenceCase',
  toSnakeCase: 'toSnakeCase',
  toTitleCase: 'toTitleCase',
  toTrainCase: 'toTrainCase',
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
