import _createKanaContextPattern from '../_internal/_createKanaContextPattern';
import { CHOUON_VARIANTS } from '../unifyChouon/constants';
import { HYPHEN_VARIANTS } from './constants';
import type { UnifyHyphensOptions } from './types';

/**
 * 長音として扱う文字の並びと、その直前のかなを探す正規表現
 *
 * `unifyChouon` と同じ並びの区切り方にするため、`HYPHEN_VARIANTS` を含む `CHOUON_VARIANTS` で探す
 * （`サ〜-` の `-` のように、かなの直後の並びに含まれるものは長音として扱う）
 */
const REGEX_CHOUON = _createKanaContextPattern(CHOUON_VARIANTS);

/**
 * ハイフンとして扱う文字の集合
 */
const HYPHEN_SET: ReadonlySet<string> = new Set(HYPHEN_VARIANTS);

/**
 * ハイフンの代わりに使われた記号を、ハイフンに統一する
 *
 * かな（全角のひらがな・カタカナと半角カタカナ）の直後にない `HYPHEN_VARIANTS` の文字
 * （`1－2`、`123ー4567`、`東京―大阪` など）だけを対象にし、
 * かなの直後にあるもの（`サーバ`、`サ―バ` など）は長音としてそのまま残す（`unifyChouon` と対になる）
 * @param str 文字列。空文字はそのまま返す
 * @param options オプション
 * @returns 統一した文字列
 */
export default function unifyHyphens(
  str: string,
  options: UnifyHyphensOptions = {},
): string {
  if (!str) {
    return str;
  }
  const { to = '-', always = false } = options;
  return str.replace(
    REGEX_CHOUON,
    (match: string, kana: string | undefined, chars: string) => {
      if (kana && !always) {
        // かなの直後は長音として残す
        return match;
      }
      let result = kana ?? '';
      for (const char of chars) {
        // 波線や罫線はハイフンにしない
        result += HYPHEN_SET.has(char) ? to : char;
      }
      return result;
    },
  );
}
