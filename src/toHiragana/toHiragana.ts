import { convertByTable } from '../convertByTable';
import { TO_HIRAGANA } from './constants';

/**
 * カタカナ → ひらがな
 * @param str
 * @returns
 */
export default function toHiragana(str: string): string {
  return convertByTable(str, TO_HIRAGANA);
}
