/**
 * NFC（標準合成）\
 * 合成済み文字を優先する。\
 * 一般的な文字列の保存・送受信などで利用
 *
 * 例:
 * - `か` + `゛` → `が`
 *
 * @param str
 * @returns
 */
export default function toNfc(str: string): string {
  if (!str) {
    return str;
  }
  return str.normalize('NFC');
}
