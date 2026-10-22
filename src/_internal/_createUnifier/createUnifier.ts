import { convertByTable } from '../../convertByTable';
import type { ConversionTable } from '../_createConversionTableComposer';

/**
 * 指定の文字を、選んだ1つの文字に統一する関数を作る
 *
 * 統一後の文字ごとに変換テーブルを作ってキャッシュする。
 * 統一後の文字自体もテーブルに含める（`\r\n` のように、他の文字を含む文字を最長一致させるため）
 * @param variants 統一する文字
 * @param defaultTo 統一後の文字の既定値
 * @returns 文字列と統一後の文字を受け取り、統一した文字列を返す関数
 */
export default function createUnifier<V extends string>(
  variants: readonly V[],
  defaultTo: V,
): (str: string, to?: V) => string {
  const tables = new Map<V, ConversionTable>();
  return (str, to = defaultTo) => {
    if (!str) {
      return str;
    }
    let table = tables.get(to);
    if (!table) {
      table = { entries: variants.map((variant) => [variant, to]) };
      tables.set(to, table);
    }
    return convertByTable(str, table);
  };
}
