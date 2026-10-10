import { convertByTable } from '../convertByTable';
import { REMOVE_WHITESPACE } from './constants';

/**
 * 空白文字の削除
 * 半角・全角スペース、タブ、ノーブレークスペースなど、改行以外の空白文字を削除する。
 * 改行の削除は`removeLineBreaks`、半角・全角スペースのみの削除は`removeSpaces`を使う
 * @param str
 * @returns
 */
export default function removeWhitespace(str: string): string {
  return convertByTable(str, REMOVE_WHITESPACE);
}
