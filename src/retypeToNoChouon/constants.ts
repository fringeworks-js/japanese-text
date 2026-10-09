import type { ReplacementMapDefinition } from '../_internal/_createReplacementMapComposer';

/**
 * 長音を削除する為のマップ
 */
export const TO_NO_CHOUON = {
  id: 'toNoChouon',
  map: [['ー', '']],
} as const satisfies ReplacementMapDefinition;
