import _createUnifier from '../_internal/_createUnifier';
import { SINGLE_QUOTE_VARIANTS } from './constants';
import type { UnifySingleQuotesOptions } from './types';

const _unify = _createUnifier(SINGLE_QUOTE_VARIANTS, "'");

/**
 * 一重引用符（曲がった引用符、全角の引用符など）を、1種類の一重引用符に統一する\
 * 開きと閉じを区別する引用符（`‘` `’` など）にはそろえられないため、統一後の文字は向きの無い引用符にする
 * @param str 文字列。空文字はそのまま返す
 * @param options オプション
 * @returns 統一した文字列
 */
export default function unifySingleQuotes(
  str: string,
  options: UnifySingleQuotesOptions = {},
): string {
  return _unify(str, options.to);
}
