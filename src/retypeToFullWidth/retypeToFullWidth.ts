import { retype } from '../retype';
import {
  TO_FULL_WIDTH,
  TO_FULL_WIDTH_ALPHABET,
  TO_FULL_WIDTH_KANA,
  TO_FULL_WIDTH_NUMBER,
  TO_FULL_WIDTH_SIGN,
  TO_FULL_WIDTH_SPACE,
} from './constants';
import type { RetypeToFullWidthOptions } from './types';

/**
 * 半角 -> 全角
 * @param str
 * @returns
 */
const retypeToFullWidth = (
  str: string,
  options: RetypeToFullWidthOptions = {},
): string => _retypeToFullWidth(str, options);
retypeToFullWidth.dataLast =
  (options: RetypeToFullWidthOptions = {}) =>
  (str: string): string =>
    _retypeToFullWidth(str, options);
export default retypeToFullWidth;

function _retypeToFullWidth(
  str: string,
  options: RetypeToFullWidthOptions = {},
): string {
  const {
    disableAlphabet = false,
    disableNumber = false,
    disableSign = false,
    disableSpace = false,
    disableKana = false,
  } = options;
  const definitions =
    !disableAlphabet &&
    !disableNumber &&
    !disableSign &&
    !disableSpace &&
    !disableKana
      ? [TO_FULL_WIDTH]
      : [
          !disableAlphabet && TO_FULL_WIDTH_ALPHABET,
          !disableNumber && TO_FULL_WIDTH_NUMBER,
          !disableSign && TO_FULL_WIDTH_SIGN,
          !disableSpace && TO_FULL_WIDTH_SPACE,
          !disableKana && TO_FULL_WIDTH_KANA,
        ];

  return retype(str, definitions);
}
