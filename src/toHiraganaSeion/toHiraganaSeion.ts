import { convertByTable } from '../convertByTable';
import {
  TO_HIRAGANA_SEION,
  TO_HIRAGANA_SEION_FROM_DAKUON,
  TO_HIRAGANA_SEION_FROM_SOKUON,
  TO_HIRAGANA_SEION_FROM_YOUON,
} from './constants';
import type { ToHiraganaSeionOptions } from './types';

/**
 * 濁音 -> 清音
 * @param str
 * @returns
 */
export default function toHiraganaSeion(
  str: string,
  options: ToHiraganaSeionOptions = {},
): string {
  const { keepDakuon = false, keepSokuon = false, keepYouon = false } = options;
  const tables =
    !keepDakuon && !keepSokuon && !keepYouon
      ? TO_HIRAGANA_SEION
      : [
          !keepDakuon && TO_HIRAGANA_SEION_FROM_DAKUON,
          !keepSokuon && TO_HIRAGANA_SEION_FROM_SOKUON,
          !keepYouon && TO_HIRAGANA_SEION_FROM_YOUON,
        ];

  return convertByTable(str, tables);
}
