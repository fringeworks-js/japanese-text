import type { ConversionTable } from '../_internal/_createConversionTableComposer';

/**
 * ひらがなの濁音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION_FROM_DAKUON = {
  id: 'toHiraganaSeionFromDakuon',
  entries: [
    ['ゔ', 'う'],
    ['が', 'か'],
    ['ぎ', 'き'],
    ['ぐ', 'く'],
    ['げ', 'け'],
    ['ご', 'こ'],
    ['ざ', 'さ'],
    ['じ', 'し'],
    ['ず', 'す'],
    ['ぜ', 'せ'],
    ['ぞ', 'そ'],
    ['だ', 'た'],
    ['ぢ', 'ち'],
    ['づ', 'つ'],
    ['で', 'て'],
    ['ど', 'と'],
    ['ば', 'は'],
    ['ぱ', 'は'],
    ['び', 'ひ'],
    ['ぴ', 'ひ'],
    ['ぷ', 'ふ'],
    ['ぶ', 'ふ'],
    ['べ', 'へ'],
    ['ぺ', 'へ'],
    ['ぼ', 'ほ'],
    ['ぽ', 'ほ'],
  ],
} as const satisfies ConversionTable;

/**
 * ひらがなの促音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION_FROM_SOKUON = {
  id: 'toHiraganaSeionFromSokuon',
  entries: [['っ', 'つ']],
} as const satisfies ConversionTable;

/**
 * ひらがなの拗音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION_FROM_YOUON = {
  id: 'toHiraganaSeionFromYouon',
  entries: [
    ['ぁ', 'あ'],
    ['ぃ', 'い'],
    ['ぅ', 'う'],
    ['ぇ', 'え'],
    ['ぉ', 'お'],
    ['ゃ', 'や'],
    ['ゅ', 'ゆ'],
    ['ょ', 'よ'],
    ['ゎ', 'わ'],
  ],
} as const satisfies ConversionTable;

/**
 * ひらがなの濁音・促音・拗音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION = {
  id: 'toHiraganaSeion',
  entries: [
    ...TO_HIRAGANA_SEION_FROM_DAKUON.entries,
    ...TO_HIRAGANA_SEION_FROM_SOKUON.entries,
    ...TO_HIRAGANA_SEION_FROM_YOUON.entries,
  ],
} as const satisfies ConversionTable;
