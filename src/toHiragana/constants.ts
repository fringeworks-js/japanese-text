import { swapPairs } from '@fringeworks/utils/array/swapPairs';
import type { ConversionTable } from '../_internal/_createConversionTableComposer';
import { TO_KATAKANA } from '../toKatakana/constants';

/**
 * カタカナ → ひらがなを変換する為のマップ
 */
export const TO_HIRAGANA: ConversionTable = {
  entries: swapPairs(TO_KATAKANA.entries),
};
