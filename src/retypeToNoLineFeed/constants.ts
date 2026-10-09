import type { ReplacementMapDefinition } from '../_internal/_createReplacementMapComposer';

/**
 * 改行（CR、LF、Unicodeの行区切り・段落区切り）を削除する為のマップ
 */
export const TO_NO_LINE_FEED = {
  id: 'toNoLineFeed',
  map: [
    ['\r\n', ''],
    ['\r', ''],
    ['\n', ''],
    ['\u2028', ''],
    ['\u2029', ''],
  ],
} as const satisfies ReplacementMapDefinition;
