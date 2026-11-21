import { convertByTable } from '../convertByTable';
import { TO_HIRAGANA } from './constants';

/**
 * カタカナ → ひらがな
 * @param data
 * @returns
 */
export default function toHiragana(data: string): string {
  return convertByTable(data, TO_HIRAGANA);
}
