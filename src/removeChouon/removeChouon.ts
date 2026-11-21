import { convertByTable } from '../convertByTable';
import { REMOVE_CHOUON } from './constants';

/**
 * 長音の削除
 * @param data
 * @returns
 */
export default function removeChouon(data: string): string {
  return convertByTable(data, REMOVE_CHOUON);
}
