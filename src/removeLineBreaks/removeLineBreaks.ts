import { convertByTable } from '../convertByTable';
import { REMOVE_LINE_BREAKS } from './constants';

/**
 * 改行の削除
 * @param str
 * @returns
 */
export default function removeLineBreaks(str: string): string {
  return convertByTable(str, REMOVE_LINE_BREAKS);
}
