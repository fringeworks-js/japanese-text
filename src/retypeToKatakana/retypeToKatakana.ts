import { retype } from '../retype';
import { TO_KATAKANA } from './constants';

/**
 * ひらがな -> カタカナ
 * @param str
 * @returns
 */
export default function retypeToKatakana(str: string): string {
  return retype(str, TO_KATAKANA);
}
