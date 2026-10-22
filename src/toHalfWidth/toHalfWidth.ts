import { convertByTable } from '../convertByTable';
import {
  TO_HALF_WIDTH,
  TO_HALF_WIDTH_ALPHABET,
  TO_HALF_WIDTH_KANA,
  TO_HALF_WIDTH_NUMBER,
  TO_HALF_WIDTH_SPACE,
  TO_HALF_WIDTH_SYMBOL,
} from './constants';
import type { ToHalfWidthOptions } from './types';

/**
 * 全角 -> 半角
 * @param str
 * @returns
 */
export default function toHalfWidth(
  str: string,
  options: ToHalfWidthOptions = {},
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
      ? [TO_HALF_WIDTH]
      : [
          !keepAlphabet && TO_HALF_WIDTH_ALPHABET,
          !keepNumber && TO_HALF_WIDTH_NUMBER,
          !keepSymbol && TO_HALF_WIDTH_SYMBOL,
          !keepSpace && TO_HALF_WIDTH_SPACE,
          !keepKana && TO_HALF_WIDTH_KANA,
        ];

  return convertByTable(str, tables);
}
