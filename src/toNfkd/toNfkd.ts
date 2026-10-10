import { isBlank } from '@fringeworks/utils/type/isBlank';

/**
 * NFKD（互換分解）\
 * 標準文字を互換文字に置き換えたうえで分解する。\
 * 全角英数字・丸数字・ローマ数字なども変換される\
 * 全角/半角・互換文字を含む表記揺れ吸収後に、macOS用にファイル名を変換する場合などで利用
 *
 * 例:
 * - `１２３` → `123`
 * - `ｶﾞ` → `カ` + `゛`
 * - `㈱` → `(株)`
 * - `Ⅳ` → `IV`
 *
 * @param data
 * @returns
 */
const toNfkd = (data: string) => _toNfkd(data);
toNfkd.dataLast = () => (data: string) => _toNfkd(data);
export default toNfkd;

function _toNfkd(data: string): string {
  if (isBlank(data)) {
    return data;
  }
  return data.normalize('NFKD');
}
