/**
 * NFD（標準分解）\
 * 文字を基底文字と結合文字に分解する。\
 * macOS用にファイル名を変換する場合などで利用
 *
 * 例:
 * - `が` → `か` + `゛`（2文字）
 *
 * @param str
 * @returns
 */
export default function toNfd(str: string): string {
  if (!str) {
    return str;
  }
  return str.normalize('NFD');
}
