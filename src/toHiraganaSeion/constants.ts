import type { ConversionTable } from '../_internal/_createConversionTableComposer';

/**
 * ひらがなの濁音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION_FROM_DAKUON: ConversionTable = {
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
    ['ゞ', 'ゝ'],
  ],
};

/**
 * ひらがなの促音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION_FROM_SOKUON: ConversionTable = {
  entries: [['っ', 'つ']],
};

/**
 * ひらがなの拗音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION_FROM_YOUON: ConversionTable = {
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
};

/**
 * ひらがなの濁音・促音・拗音 -> 清音を変換する為のマップ
 */
export const TO_HIRAGANA_SEION: ConversionTable = {
  entries: [
    ...TO_HIRAGANA_SEION_FROM_DAKUON.entries,
    ...TO_HIRAGANA_SEION_FROM_SOKUON.entries,
    ...TO_HIRAGANA_SEION_FROM_YOUON.entries,
  ],
};
