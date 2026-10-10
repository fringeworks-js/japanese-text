import { clearArray } from '@fringeworks/utils/array/clearArray';
import { isBlank } from '@fringeworks/utils/type/isBlank';
import type { ConversionTable } from '../convertByTable';
import { convertByTable } from '../convertByTable';
import {
  TRANSFORMATION_FUNCTIONS,
  TRANSFORMATION_TABLES,
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

  const { composeTables } = options;
  const tables: ConversionTable[] = [];
  const lastIndex = types.length - 1;
  return types.reduce((result, type, index) => {
    const fn = TRANSFORMATION_FUNCTIONS[type];
    if (fn) {
      if (composeTables && tables.length) {
        // composeTables=trueの場合はため込んだtablesの処理を先に行う
        result = convertByTable(result, clearArray(tables));
      }
      // 変換関数で変換
      return fn(result);
    }
    const table = TRANSFORMATION_TABLES[type];
    if (table) {
      // 変換テーブルで変換
      if (composeTables) {
        // composeTables=trueの場合はtablesにため込む
        tables.push(table);
      } else {
        // 即変換
        return convertByTable(result, [table]);
      }
    }
    if (composeTables && tables.length && lastIndex === index) {
      // composeTables=trueで最後の要素の場合はため込んだtablesの処理を行う
      return convertByTable(result, tables);
    }
    return result;
  }, str);
}
