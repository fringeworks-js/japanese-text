import { isBlank } from '@fringeworks/utils/type/isBlank';

/**
 * NFKC（互換合成）\
 * 標準文字を互換文字に置き換えた上で合成する。\
 * 全角英数字・丸数字・ローマ数字なども変換される\
 * 全角/半角・互換文字を含む表記揺れ吸収などで利用
 *
 * 例:
 * - `１２３` → `123`
 * - `ｶﾞ` → `ガ`
 * - `㈱` → `(株)`
 * - `Ⅳ` → `IV`
 *
 * @param str
 * @returns
 */
const retypeToNfkc = (data: string) => _retypeToNfkc(data);
retypeToNfkc.dataLast = () => (data: string) => _retypeToNfkc(data);
export default retypeToNfkc;

function _retypeToNfkc(data: string): string {
  if (isBlank(data)) {
    return data;
  }
  return data.normalize('NFKC');
}
