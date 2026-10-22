import type { ConversionTable } from '../_internal/_createConversionTableComposer';

/**
 * カタカナの濁音 -> 清音を変換する為のマップ
 */
export const TO_KATAKANA_SEION_FROM_DAKUON: ConversionTable = {
  entries: [
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
};

/**
 * カタカナの促音 -> 清音を変換する為のマップ
 */
export const TO_KATAKANA_SEION_FROM_SOKUON: ConversionTable = {
  entries: [['ッ', 'ツ']],
};

/**
 * カタカナの拗音 -> 清音を変換する為のマップ
 */
export const TO_KATAKANA_SEION_FROM_YOUON: ConversionTable = {
  entries: [
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
};

/**
 * カタカナの濁音・促音・拗音 -> 清音を変換する為のマップ
 */
export const TO_KATAKANA_SEION: ConversionTable = {
  entries: [
    ...TO_KATAKANA_SEION_FROM_DAKUON.entries,
    ...TO_KATAKANA_SEION_FROM_SOKUON.entries,
    ...TO_KATAKANA_SEION_FROM_YOUON.entries,
  ],
};
