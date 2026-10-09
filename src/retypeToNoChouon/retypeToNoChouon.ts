import { retype } from '../retype';
import { TO_NO_CHOUON } from './constants';

/**
 * 長音の削除
 * @param str
 * @returns
 */
export default function retypeToNoChouon(str: string): string {
  return retype(str, TO_NO_CHOUON);
}
