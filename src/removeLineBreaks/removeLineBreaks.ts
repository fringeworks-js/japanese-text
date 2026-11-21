import { convertByTable } from '../convertByTable';
import { REMOVE_LINE_BREAKS } from './constants';

/**
 * 改行の削除
 * @param data
 * @returns
 */
export default function removeLineBreaks(data: string): string {
  return convertByTable(data, REMOVE_LINE_BREAKS);
}
