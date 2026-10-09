import { retype } from '../retype';
import { TO_NO_LINE_FEED } from './constants';

/**
 * 改行の削除
 * @param str
 * @returns
 */
export default function retypeToNoLineFeed(str: string): string {
  return retype(str, TO_NO_LINE_FEED);
}
