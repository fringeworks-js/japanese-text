import { retype } from '../retype';
import { TO_NO_SPACE } from './constants';

/**
 * 半角スペース・全角スペースの削除
 * タブなどの他の空白文字も削除する場合は`retypeToNoWhitespace`を使う
 * @param str
 * @returns
 */
export default function retypeToNoSpace(str: string): string {
  return retype(str, TO_NO_SPACE);
}
