import { isBlank } from '@fringeworks/utils/type/isBlank';

/**
 * NFD（標準分解）\
 * 文字を基底文字と結合文字に分解する。\
 * macOS用にファイル名を変換する場合などで利用
 *
 * 例:
 * - `が` → `か` + `゛`（2文字）
 *
 * @param data
 * @returns
 */
const toNfd = (data: string) => _toNfd(data);
toNfd.dataLast = () => (data: string) => _toNfd(data);
export default toNfd;

function _toNfd(data: string): string {
  if (isBlank(data)) {
    return data;
  }
  return data.normalize('NFD');
}
