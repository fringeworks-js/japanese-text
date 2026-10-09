import { ensureArray } from '@fringeworks/utils/array/ensureArray';
import { replaceByMap } from '@fringeworks/utils/string/replaceByMap';
import { isBlank } from '@fringeworks/utils/type/isBlank';
import _createReplacementMapComposer from '../_internal/_createReplacementMapComposer';
import type { ReplacementMapDefinition } from './types';

// mapの合成とキャッシュの管理をする関数
const _composeReplacementMap = _createReplacementMapComposer();

/**
 * 合成したmapごとの置換関数
 * 合成したmapはキャッシュされ変更されないので、置換関数もキャッシュする
 */
const replacers = new WeakMap<Map<string, string>, (str: string) => string>();

export default function retype(
  str: string,
  definitions: ReplacementMapDefinition | ReplacementMapDefinition[],
): string {
  if (isBlank(str)) {
    return str;
  }
  const map = _composeReplacementMap(ensureArray(definitions));
  let replacer = replacers.get(map);
  if (!replacer) {
    replacer = replaceByMap.dataLast(map);
    replacers.set(map, replacer);
  }
  return replacer(str);
}
