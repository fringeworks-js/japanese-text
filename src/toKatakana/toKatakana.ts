import { convertByTable } from '../convertByTable';
import { TO_KATAKANA } from './constants';

/**
 * ひらがな -> カタカナ
 * @param data
 * @returns
 */
export default function toKatakana(data: string): string {
  return convertByTable(data, TO_KATAKANA);
}
