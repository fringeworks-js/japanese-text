import _createUnifier from '../_internal/_createUnifier';
import { SPACE_VARIANTS } from './constants';
import type { UnifySpacesOptions } from './types';

const _unify = _createUnifier(SPACE_VARIANTS, ' ');

/**
 * 各種のスペース（全角スペース、ノーブレークスペース、各種の幅のスペースなど）を、1種類のスペースに統一する\
 * タブと改行は対象外。連続するスペースはまとめない
 * @param str 文字列。空文字はそのまま返す
 * @param options オプション
 * @returns 統一した文字列
 */
export default function unifySpaces(
  str: string,
  options: UnifySpacesOptions = {},
): string {
  return _unify(str, options.to);
}
