import _createKanaContextPattern, {
  isHalfWidthKana,
} from '../_internal/_createKanaContextPattern';
import { CHOUON_VARIANTS } from './constants';
import type { UnifyChouonOptions } from './types';

/**
 * 長音として扱う文字の並びと、その直前のかなを探す正規表現
 */
const REGEX_CHOUON = _createKanaContextPattern(CHOUON_VARIANTS);

/**
 * 長音の代わりに使われた記号を、長音記号に統一する
 *
 * かな（全角のひらがな・カタカナと半角カタカナ）の直後にある `CHOUON_VARIANTS` の文字
 * （`サ―バ`、`メ-ル`、`すご〜い` など）だけを対象にし、
 * それ以外の位置（`1-2`、`東京―大阪`、`1〜3` など）はそのまま残す（`unifyHyphens` と対になる）。
 * 長音記号自体も対象にするため、`to` を指定すると長音記号もその文字にする
 * @param str 文字列。空文字はそのまま返す
 * @param options オプション
 * @returns 統一した文字列
 */
export default function unifyChouon(
  str: string,
  options: UnifyChouonOptions = {},
): string {
  if (!str) {
    return str;
  }
  const { to, always = false } = options;
  return str.replace(
    REGEX_CHOUON,
    (match: string, kana: string | undefined, chouons: string) => {
      if (always) {
        // 前の文字を見ずに統一する
        return (kana ?? '') + (to ?? 'ー').repeat(chouons.length);
      }
      if (kana) {
        // かなの直後は、指定が無ければ直前のかなの幅に合わせる
        const char = to ?? (isHalfWidthKana(kana) ? 'ｰ' : 'ー');
        return kana + char.repeat(chouons.length);
      }
      return match;
    },
  );
}
