import { convertByTable } from '../convertByTable';
import { REMOVE_CHOUON } from './constants';

/**
 * 長音の削除
 * @param str
 * @returns
 */
export default function removeChouon(str: string): string {
  return convertByTable(str, REMOVE_CHOUON);
}
