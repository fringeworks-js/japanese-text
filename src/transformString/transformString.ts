import { clearArray } from '@fringeworks/utils/array/clearArray';
import { isBlank } from '@fringeworks/utils/type/isBlank';
import type { ReplacementMapDefinition } from '../retype';
import { retype } from '../retype';
import {
  TRANSFORMATION_FUNCTIONS,
  TRANSFORMATION_MAPS,
} from './_transformations';
import type { TransformationType } from './constants';
import type { TransformStringOptions } from './types';

/**
 * 文字列へtypesで指定した順に変換を適用する
 * @param str
 * @param types
 * @returns
 */
const transformString = (
  str: string,
  types: TransformationType[],
  options: TransformStringOptions = {},
): string => _transformString(str, types, options);
transformString.dataLast =
  (types: TransformationType[], options: TransformStringOptions = {}) =>
  (str: string): string =>
    _transformString(str, types, options);
export default transformString;

function _transformString(
  str: string,
  types: TransformationType[],
  options: TransformStringOptions = {},
): string {
  if (isBlank(str)) {
    return str;
  }

  const { composeMap } = options;
  const maps: ReplacementMapDefinition[] = [];
  const lastIndex = types.length - 1;
  return types.reduce((result, type, index) => {
    const fn = TRANSFORMATION_FUNCTIONS[type];
    if (fn) {
      if (composeMap && maps.length) {
        // composeMap=trueの場合はため込んだmapsの処理を先に行う
        result = retype(result, clearArray(maps));
      }
      // 変換関数で変換
      return fn(result);
    }
    const mapDefiniton = TRANSFORMATION_MAPS[type];
    if (mapDefiniton) {
      // mapで変換
      if (composeMap) {
        // composeMap=trueの場合はmapsにため込む
        maps.push(mapDefiniton);
      } else {
        // 即変換
        return retype(result, [mapDefiniton]);
      }
    }
    if (composeMap && maps.length && lastIndex === index) {
      // composeMap=trueで最後の要素の場合はため込んだmapsの処理を行う
      return retype(result, maps);
    }
    return result;
  }, str);
}
