import { convertByTable } from '../convertByTable';
import {
  TO_KATAKANA_SEION,
  TO_KATAKANA_SEION_FROM_DAKUON,
  TO_KATAKANA_SEION_FROM_SOKUON,
  TO_KATAKANA_SEION_FROM_YOUON,
} from './constants';
import type { ToKatakanaSeionOptions } from './types';

/**
 * 濁音 -> 清音
 * @param str
 * @returns
 */
export default function toKatakanaSeion(
  str: string,
  options: ToKatakanaSeionOptions = {},
): string {
  const { keepDakuon = false, keepSokuon = false, keepYouon = false } = options;
  const tables =
    !keepDakuon && !keepSokuon && !keepYouon
      ? TO_KATAKANA_SEION
      : [
          !keepDakuon && TO_KATAKANA_SEION_FROM_DAKUON,
          !keepSokuon && TO_KATAKANA_SEION_FROM_SOKUON,
          !keepYouon && TO_KATAKANA_SEION_FROM_YOUON,
        ];

  return convertByTable(str, tables);
}
