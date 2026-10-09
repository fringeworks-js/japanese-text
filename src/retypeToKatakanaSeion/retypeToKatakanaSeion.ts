import { retype } from '../retype';
import {
  TO_KATAKANA_SEION,
  TO_KATAKANA_SEION_FROM_DAKUON,
  TO_KATAKANA_SEION_FROM_SOKUON,
  TO_KATAKANA_SEION_FROM_YOUON,
} from './constants';
import type { RetypeToKatakanaSeionOptions } from './types';

/**
 * 濁音 -> 清音
 * @param str
 * @returns
 */
export default function retypeToKatakanaSeion(
  str: string,
  options: RetypeToKatakanaSeionOptions = {},
): string {
  const {
    disableDakuon = false,
    disableSokuon = false,
    disableYouon = false,
  } = options;
  const definitions =
    !disableDakuon && !disableSokuon && !disableYouon
      ? TO_KATAKANA_SEION
      : [
          !disableDakuon && TO_KATAKANA_SEION_FROM_DAKUON,
          !disableSokuon && TO_KATAKANA_SEION_FROM_SOKUON,
          !disableYouon && TO_KATAKANA_SEION_FROM_YOUON,
        ];

  return retype(str, definitions);
}
