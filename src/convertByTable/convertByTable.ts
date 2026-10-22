import { ensureArray } from '@fringeworks/utils/array/ensureArray';
import { createReplacerByMap } from '@fringeworks/utils/string/createReplacerByMap';
import _createConversionTableComposer from '../_internal/_createConversionTableComposer';
import type { ConversionTable } from './types';

// mapの合成とキャッシュの管理をする関数
const _composeConversionTables = _createConversionTableComposer();

/**
 * 合成したmapごとの置換関数
 * 合成したmapはキャッシュされ変更されないので、置換関数もキャッシュする
 */
const replacers = new WeakMap<Map<string, string>, (str: string) => string>();

/**
 * 変換テーブルに従って文字列を変換する
 *
 * 複数のテーブルは1つにまとめて変換する（同じ変換前の文字列は後のテーブルが優先）。
 * まとめたテーブルはテーブルのオブジェクトと順番ごとにキャッシュする
 * @param str 文字列
 * @param tables 変換テーブル。配列の false・null・undefined は無視する
 * @returns 変換した文字列
 */
export default function convertByTable(
  str: string,
  tables: ConversionTable | (ConversionTable | false | null | undefined)[],
): string {
  if (!str) {
    return str;
  }
  const map = _composeConversionTables(ensureArray(tables));
  let replacer = replacers.get(map);
  if (!replacer) {
    replacer = createReplacerByMap(map);
    replacers.set(map, replacer);
  }
  return replacer(str);
}
