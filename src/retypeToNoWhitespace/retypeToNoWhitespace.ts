import { retype } from '../retype';
import { TO_NO_WHITESPACE } from './constants';

/**
 * 空白文字の削除
 * 半角・全角スペース、タブ、ノーブレークスペースなど、改行以外の空白文字を削除する。
 * 改行の削除は`retypeToNoLineFeed`、半角・全角スペースのみの削除は`retypeToNoSpace`を使う
 * @param str
 * @returns
 */
export default function retypeToNoWhitespace(str: string): string {
  return retype(str, TO_NO_WHITESPACE);
}
