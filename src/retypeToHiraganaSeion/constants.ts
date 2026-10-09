import type { ReplacementMapDefinition } from '../_internal/_createReplacementMapComposer';

/**
 * ひらがなの濁音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION_FROM_DAKUON = {
  id: 'toHiraganaSeionFromDakuon',
  map: [
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
} as const satisfies ReplacementMapDefinition;

/**
 * ひらがなの促音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION_FROM_SOKUON = {
  id: 'toHiraganaSeionFromSokuon',
  map: [['っ', 'つ']],
} as const satisfies ReplacementMapDefinition;

/**
 * ひらがなの拗音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION_FROM_YOUON = {
  id: 'toHiraganaSeionFromYouon',
  map: [
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
} as const satisfies ReplacementMapDefinition;

/**
 * ひらがなの濁音・促音・拗音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION = {
  id: 'toHiraganaSeion',
  map: [
    ...TO_HIRAGANA_SEION_FROM_DAKUON.map,
    ...TO_HIRAGANA_SEION_FROM_SOKUON.map,
    ...TO_HIRAGANA_SEION_FROM_YOUON.map,
  ],
} as const satisfies ReplacementMapDefinition;
