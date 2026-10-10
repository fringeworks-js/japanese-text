import type { ConversionTable } from '../_internal/_createConversionTableComposer';

/**
 * 長音を削除する為のマップ
 */
export const REMOVE_CHOUON = {
  id: 'removeChouon',
  entries: [['ー', '']],
} as const satisfies ConversionTable;
