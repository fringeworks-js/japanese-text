import _createUnifier from '../_internal/_createUnifier';
import { MIDDLE_DOT_VARIANTS } from './constants';
import type { UnifyMiddleDotsOptions } from './types';

const _unify = _createUnifier(MIDDLE_DOT_VARIANTS, '・');

/**
 * 中黒（全角・半角の中黒、欧文の中点など）を、1種類の中黒に統一する
 * @param str 文字列。空文字はそのまま返す
 * @param options オプション
 * @returns 統一した文字列
 */
export default function unifyMiddleDots(
  str: string,
  options: UnifyMiddleDotsOptions = {},
): string {
  return _unify(str, options.to);
}
