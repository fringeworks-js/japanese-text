import type { ConversionTable } from '../_internal/_createConversionTableComposer';

/**
 * 半角スペース・全角スペースを削除する為のマップ
 */
export const REMOVE_SPACES = {
  id: 'removeSpaces',
  entries: [
    [' ', ''],
    ['\u3000', ''],
  ],
} as const satisfies ConversionTable;
