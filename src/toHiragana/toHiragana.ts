import { convertByTable } from '../convertByTable';
import { TO_HIRAGANA } from './constants';

/**
 * カタカナ → ひらがな
 * @param str
 * @returns
 */
const toHiragana = (str: string): string => _toHiragana(str);
toHiragana.dataLast =
  () =>
  (str: string): string =>
    _toHiragana(str);
export default toHiragana;

function _toHiragana(str: string): string {
  return convertByTable(str, TO_HIRAGANA);
}
