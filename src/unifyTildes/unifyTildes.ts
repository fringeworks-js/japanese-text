import _createUnifier from '../_internal/_createUnifier';
import { TILDE_VARIANTS } from './constants';
import type { UnifyTildesOptions } from './types';

const _unify = _createUnifier(TILDE_VARIANTS, '～');

/**
 * 波線（全角チルダ、波ダッシュ、半角チルダなど）を、1種類の波線に統一する\
 * かなの直後の波線を長音にする場合は、先に `unifyChouon` を使う
 * @param str 文字列。空文字はそのまま返す
 * @param options オプション
 * @returns 統一した文字列
 */
export default function unifyTildes(
  str: string,
  options: UnifyTildesOptions = {},
): string {
  return _unify(str, options.to);
}
