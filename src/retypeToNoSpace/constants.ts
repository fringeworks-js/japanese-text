import type { ReplacementMapDefinition } from '../_internal/_createReplacementMapComposer';

/**
 * 半角スペース・全角スペースを削除する為のマップ
 */
export const TO_NO_SPACE = {
  id: 'toNoSpace',
  map: [
    [' ', ''],
    ['\u3000', ''],
  ],
} as const satisfies ReplacementMapDefinition;
