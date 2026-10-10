import { ensureArray } from '@fringeworks/utils/array/ensureArray';
import { replaceByMap } from '@fringeworks/utils/string/replaceByMap';
import { isBlank } from '@fringeworks/utils/type/isBlank';
import _createConversionTableComposer from '../_internal/_createConversionTableComposer';
import type { ConversionTable } from './types';

// mapの合成とキャッシュの管理をする関数
const _composeConversionTables = _createConversionTableComposer();

/**
 * 合成したmapごとの置換関数
 * 合成したmapはキャッシュされ変更されないので、置換関数もキャッシュする
 */
const replacers = new WeakMap<Map<string, string>, (str: string) => string>();

export default function convertByTable(
  str: string,
  tables: ConversionTable | ConversionTable[],
): string {
  if (isBlank(str)) {
    return str;
  }
  const map = _composeConversionTables(ensureArray(tables));
  let replacer = replacers.get(map);
  if (!replacer) {
    replacer = replaceByMap.dataLast(map);
    replacers.set(map, replacer);
  }
  return replacer(str);
}
