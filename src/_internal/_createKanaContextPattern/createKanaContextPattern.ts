/**
 * 前後の文字の判断に使う「かな」
 *
 * - 全角のひらがな・カタカナ（濁点・半濁点（結合用・単独）と踊り字を含む。長音記号と中黒は含まない）
 * - 半角カタカナ（半角の濁点・半濁点を含む。半角の長音記号と句読点などは含まない）
 */
const KANA_CHAR_CLASS =
  '\\u3041-\\u3096\\u3099-\\u309e\\u30a1-\\u30fa\\u30fd\\u30fe' +
  '\\uff66-\\uff6f\\uff71-\\uff9f';

/**
 * 文字クラスの中で特別な意味を持つ文字をエスケープする
 */
function escapeForCharClass(char: string): string {
  return char.replace(/[\\\]^-]/g, '\\$&');
}

/**
 * 指定の文字の並びと、その直前のかなを探す正規表現を作る
 *
 * グループ1は直前のかな（無い場合は undefined）、グループ2は指定の文字の並び。
 * 後読みは対応ブラウザーの範囲外のため、直前のかなもグループとして取得する
 * @param chars 探す文字（1文字ずつ）
 * @returns グローバルフラグ付きの正規表現
 */
export default function createKanaContextPattern(
  chars: readonly string[],
): RegExp {
  return new RegExp(
    `([${KANA_CHAR_CLASS}])?([${chars.map(escapeForCharClass).join('')}]+)`,
    'g',
  );
}

/**
 * 半角カタカナか
 * @param char 1文字
 */
export function isHalfWidthKana(char: string): boolean {
  return char >= 'ｦ' && char <= 'ﾟ';
}
