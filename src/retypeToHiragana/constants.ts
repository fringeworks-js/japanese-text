import { swapPairs } from '@fringeworks/utils/array/swapPairs';
import type { ReplacementMapDefinition } from '../_internal/_createReplacementMapComposer';
import { TO_KATAKANA } from '../retypeToKatakana/constants';

/**
 * カタカナ → ひらがなを変換する為のマップ
 */
export const TO_HIRAGANA = {
  id: 'toHiragana',
  map: swapPairs(TO_KATAKANA.map),
} as const satisfies ReplacementMapDefinition;
