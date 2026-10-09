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
const retypeToNfc = (data: string) => _retypeToNfc(data);
retypeToNfc.dataLast = () => (data: string) => _retypeToNfc(data);
export default retypeToNfc;

function _retypeToNfc(data: string): string {
  if (isBlank(data)) {
    return data;
  }
  return data.normalize('NFC');
}
