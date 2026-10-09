import _getShiftJisCharByteLength from '../_internal/_getShiftJisCharByteLength';

/**
 * 文字列をShift_JISで表した時のバイト数を取得する
 *
 * Shift_JISはWHATWG Encoding Standard の定義（Windows-31J相当）に従う。
 * 改行などの制御文字は1バイトとして数える。
 * Shift_JISで表せない文字（ユーザー定義領域（外字）を含む）がある場合はnull
 * @param str 文字列
 * @returns バイト数。Shift_JISで表せない文字がある場合はnull
 */
export default function getShiftJisByteLength(
  str: string | null | undefined,
): number | null {
  if (!str) {
    return 0;
  }
  let length = 0;
  for (const char of str) {
    const codePoint = char.codePointAt(0)!;
    if (codePoint <= 0x80) {
      // ASCIIの制御文字を含む1バイトの範囲
      length += 1;
      continue;
    }
    const charLength = _getShiftJisCharByteLength(codePoint);
    if (charLength === 0) {
      return null;
    }
    length += charLength;
  }
  return length;
}
