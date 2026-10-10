import { convertByTable } from '../convertByTable';
import { TO_KATAKANA } from './constants';

/**
 * ひらがな -> カタカナ
 * @param str
 * @returns
 */
export default function toKatakana(str: string): string {
  return convertByTable(str, TO_KATAKANA);
}
