import type { ConversionTable } from '../_internal/_createConversionTableComposer';

/**
 * 空白文字を削除する為のマップ
 * 半角・全角スペース、タブ、ノーブレークスペースなど、改行以外の空白文字が対象
 */
export const REMOVE_WHITESPACE: ConversionTable = {
  entries: [
    ['\t', ''],
    ['\v', ''],
    ['\f', ''],
    [' ', ''],
    ['\u00A0', ''],
    ['\u1680', ''],
    ['\u2000', ''],
    ['\u2001', ''],
    ['\u2002', ''],
    ['\u2003', ''],
    ['\u2004', ''],
    ['\u2005', ''],
    ['\u2006', ''],
    ['\u2007', ''],
    ['\u2008', ''],
    ['\u2009', ''],
    ['\u200A', ''],
    ['\u202F', ''],
    ['\u205F', ''],
    ['\u3000', ''],
    ['\uFEFF', ''],
  ],
};
