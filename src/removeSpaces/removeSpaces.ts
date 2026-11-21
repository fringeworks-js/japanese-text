import { convertByTable } from '../convertByTable';
import { REMOVE_SPACES } from './constants';

/**
 * 半角スペース・全角スペースの削除
 * タブなどの他の空白文字も削除する場合は`removeWhitespace`を使う
 * @param data
 * @returns
 */
export default function removeSpaces(data: string): string {
  return convertByTable(data, REMOVE_SPACES);
}
