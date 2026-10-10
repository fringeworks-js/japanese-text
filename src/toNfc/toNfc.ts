import { isBlank } from '@fringeworks/utils/type/isBlank';

/**
 * NFC（標準合成）\
 * 合成済み文字を優先する。\
 * 一般的な文字列の保存・送受信などで利用
 *
 * 例:
 * - `か` + `゛` → `が`
 *
 * @param data
 * @returns
 */
const toNfc = (data: string) => _toNfc(data);
toNfc.dataLast = () => (data: string) => _toNfc(data);
export default toNfc;

function _toNfc(data: string): string {
  if (isBlank(data)) {
    return data;
  }
  return data.normalize('NFC');
}
