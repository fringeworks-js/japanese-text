import { retype } from '../retype';
import {
  TO_HIRAGANA_SEION,
  TO_HIRAGANA_SEION_FROM_DAKUON,
  TO_HIRAGANA_SEION_FROM_SOKUON,
  TO_HIRAGANA_SEION_FROM_YOUON,
} from './constants';
import type { RetypeToHiraganaSeionOptions } from './types';

/**
 * 濁音 -> 清音
 * @param str
 * @returns
 */
export default function retypeToHiraganaSeion(
  str: string,
  options: RetypeToHiraganaSeionOptions = {},
): string {
  const {
    disableDakuon = false,
    disableSokuon = false,
    disableYouon = false,
  } = options;
  const definitions =
    !disableDakuon && !disableSokuon && !disableYouon
      ? TO_HIRAGANA_SEION
      : [
          !disableDakuon && TO_HIRAGANA_SEION_FROM_DAKUON,
          !disableSokuon && TO_HIRAGANA_SEION_FROM_SOKUON,
          !disableYouon && TO_HIRAGANA_SEION_FROM_YOUON,
        ];

  return retype(str, definitions);
}
