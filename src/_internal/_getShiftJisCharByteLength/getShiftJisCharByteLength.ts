/**
 * Shift_JISの2バイト文字のコードポイントの集合
 * 初回の利用時に作成する
 */
let doubleByteCodePoints: Set<number> | undefined;

/**
 * Shift_JISの2バイト文字のコードポイントの集合を作る
 *
 * WHATWG Encoding Standard の Shift_JIS（Windows-31J相当）のデコーダーで、
 * 2バイトの全ての組み合わせをデコードして作成する。
 * ユーザー定義領域（外字）は環境によって異なるため含めない
 */
function createDoubleByteCodePoints(): Set<number> {
  const decoder = new TextDecoder('shift_jis');
  const codePoints = new Set<number>();
  const bytes = new Uint8Array(2);
  for (let lead = 0x81; lead <= 0xfc; lead++) {
    if (lead > 0x9f && lead < 0xe0) {
      continue;
    }
    for (let trail = 0x40; trail <= 0xfc; trail++) {
      if (trail === 0x7f) {
        continue;
      }
      bytes[0] = lead;
      bytes[1] = trail;
      const char = decoder.decode(bytes);
      const codePoint = char.codePointAt(0)!;
      if (
        char.length === 1 &&
        codePoint !== 0xfffd &&
        !(codePoint >= 0xe000 && codePoint <= 0xf8ff)
      ) {
        codePoints.add(codePoint);
      }
    }
  }
  return codePoints;
}

/**
 * コードポイントをShift_JISで表した時のバイト数を取得する
 *
 * - 1: 1バイト文字（ASCIIの表示可能な文字、半角カタカナ、`¥`、`‾`）
 * - 2: 2バイト文字（JIS X 0208の文字とWindows-31Jの拡張文字）
 * - 0: Shift_JISで表せない文字、制御文字
 * @param codePoint コードポイント
 * @returns バイト数
 */
export default function getShiftJisCharByteLength(
  codePoint: number,
): 0 | 1 | 2 {
  if (
    (codePoint >= 0x20 && codePoint <= 0x7e) ||
    (codePoint >= 0xff61 && codePoint <= 0xff9f) ||
    // JIS X 0201 の円記号とオーバーライン
    codePoint === 0xa5 ||
    codePoint === 0x203e
  ) {
    return 1;
  }
  doubleByteCodePoints ??= createDoubleByteCodePoints();
  return doubleByteCodePoints.has(codePoint) ? 2 : 0;
}
