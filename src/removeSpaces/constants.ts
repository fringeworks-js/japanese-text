import type { ConversionTable } from '../_internal/_createConversionTableComposer';

/**
 * 半角スペース・全角スペースを削除する為のマップ
 */
export const REMOVE_SPACES: ConversionTable = {
  entries: [
    [' ', ''],
    ['\u3000', ''],
  ],
};
