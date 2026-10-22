import type { ConversionTable } from '../_internal/_createConversionTableComposer';

/**
 * 改行（CR、LF、Unicodeの行区切り・段落区切り）を削除する為のマップ
 */
export const REMOVE_LINE_BREAKS: ConversionTable = {
  entries: [
    ['\r\n', ''],
    ['\r', ''],
    ['\n', ''],
    ['\u2028', ''],
    ['\u2029', ''],
  ],
};
