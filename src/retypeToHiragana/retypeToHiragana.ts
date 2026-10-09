import { retype } from '../retype';
import { TO_HIRAGANA } from './constants';

/**
 * カタカナ → ひらがな
 * @param str
 * @returns
 */
const retypeToHiragana = (str: string): string => _retypeToHiragana(str);
retypeToHiragana.dataLast =
  () =>
  (str: string): string =>
    _retypeToHiragana(str);
export default retypeToHiragana;

function _retypeToHiragana(str: string): string {
  return retype(str, TO_HIRAGANA);
}
