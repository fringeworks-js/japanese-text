import _createUnifier from '../_internal/_createUnifier';
import { LINE_BREAK_VARIANTS } from './constants';
import type { UnifyLineBreaksOptions } from './types';

const _unify = _createUnifier(LINE_BREAK_VARIANTS, '\n');

/**
 * 改行（CRLF、CR、LF、Unicode の行区切り・段落区切り）を、1種類の改行に統一する
 * @param str 文字列。空文字はそのまま返す
 * @param options オプション
 * @returns 統一した文字列
 */
export default function unifyLineBreaks(
  str: string,
  options: UnifyLineBreaksOptions = {},
): string {
  return _unify(str, options.to);
}
