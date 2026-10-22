import { convertByTable } from '../convertByTable';
import {
  TO_FULL_WIDTH,
  TO_FULL_WIDTH_ALPHABET,
  TO_FULL_WIDTH_KANA,
  TO_FULL_WIDTH_NUMBER,
  TO_FULL_WIDTH_SPACE,
  TO_FULL_WIDTH_SYMBOL,
} from './constants';
import type { ToFullWidthOptions } from './types';

/**
 * 半角 -> 全角
 * @param str
 * @returns
 */
export default function toFullWidth(
  str: string,
  options: ToFullWidthOptions = {},
): string {
  const {
    keepAlphabet = false,
    keepNumber = false,
    keepSymbol = false,
    keepSpace = false,
    keepKana = false,
  } = options;
  const tables =
    !keepAlphabet && !keepNumber && !keepSymbol && !keepSpace && !keepKana
      ? [TO_FULL_WIDTH]
      : [
          !keepAlphabet && TO_FULL_WIDTH_ALPHABET,
          !keepNumber && TO_FULL_WIDTH_NUMBER,
          !keepSymbol && TO_FULL_WIDTH_SYMBOL,
          !keepSpace && TO_FULL_WIDTH_SPACE,
          !keepKana && TO_FULL_WIDTH_KANA,
        ];

  return convertByTable(str, tables);
}
