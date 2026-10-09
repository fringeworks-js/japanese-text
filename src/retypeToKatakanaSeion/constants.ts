import type { ReplacementMapDefinition } from '../_internal/_createReplacementMapComposer';

/**
 * カタカナの濁音 -> 清音を変換する為のマップ
 */
export const TO_KATAKANA_SEION_FROM_DAKUON = {
  id: 'toKatakanaSeionFromDakuon',
  map: [
    ['ヴ', 'ウ'],
    ['ガ', 'カ'],
    ['ギ', 'キ'],
    ['グ', 'ク'],
    ['ゲ', 'ケ'],
    ['ゴ', 'コ'],
    ['ザ', 'サ'],
    ['ジ', 'シ'],
    ['ズ', 'ス'],
    ['ゼ', 'セ'],
    ['ゾ', 'ソ'],
    ['ダ', 'タ'],
    ['ヂ', 'チ'],
    ['ヅ', 'ツ'],
    ['デ', 'テ'],
    ['ド', 'ト'],
    ['バ', 'ハ'],
    ['パ', 'ハ'],
    ['ビ', 'ヒ'],
    ['ピ', 'ヒ'],
    ['ブ', 'フ'],
    ['プ', 'フ'],
    ['ベ', 'ヘ'],
    ['ペ', 'ヘ'],
    ['ボ', 'ホ'],
    ['ポ', 'ホ'],
    ['ヾ', 'ヽ'],
  ],
} as const satisfies ReplacementMapDefinition;

/**
 * カタカナの促音 -> 清音を変換する為のマップ
 */
export const TO_KATAKANA_SEION_FROM_SOKUON = {
  id: 'toKatakanaSeionFromSokuon',
  map: [['ッ', 'ツ']],
} as const satisfies ReplacementMapDefinition;

/**
 * カタカナの拗音 -> 清音を変換する為のマップ
 */
export const TO_KATAKANA_SEION_FROM_YOUON = {
  id: 'toKatakanaSeionFromYouon',
  map: [
    ['ァ', 'ア'],
    ['ィ', 'イ'],
    ['ゥ', 'ウ'],
    ['ェ', 'エ'],
    ['ォ', 'オ'],
    ['ャ', 'ヤ'],
    ['ュ', 'ユ'],
    ['ョ', 'ヨ'],
    ['ヮ', 'ワ'],
  ],
} as const satisfies ReplacementMapDefinition;

/**
 * カタカナの濁音・促音・拗音 -> 清音を変換する為のマップ
 */
export const TO_KATAKANA_SEION = {
  id: 'toKatakanaSeion',
  map: [
    ...TO_KATAKANA_SEION_FROM_DAKUON.map,
    ...TO_KATAKANA_SEION_FROM_SOKUON.map,
    ...TO_KATAKANA_SEION_FROM_YOUON.map,
  ],
} as const satisfies ReplacementMapDefinition;
