import _getShiftJisCharByteLength from '../_internal/_getShiftJisCharByteLength';

/**
 * 文字列がShift_JISの1バイト文字のみで構成されているか判定する
 *
 * Shift_JISはWHATWG Encoding Standard の定義（Windows-31J相当）に従う。
 * ブラウザーがShift_JISのフォームを送信する際の変換と同じ範囲になる。
 * 制御文字やユーザー定義領域（外字）は含まない。
 * 空文字の場合はfalse
 * @param str 文字列
 * @returns
 */
export default function isShiftJisSingleByte(str: string): boolean {
  if (typeof str !== 'string' || str === '') {
    return false;
  }
  for (const char of str) {
    if (_getShiftJisCharByteLength(char.codePointAt(0)!) !== 1) {
      return false;
    }
  }
  return true;
}
