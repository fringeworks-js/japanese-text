import { transformString } from '../transformString';
import { TransformationType } from '../transformString/constants';
import type { NormalizeStringOptions } from './types';

/**
 * 文字列の表記揺れを無くし、比較可能な形に整える
 * @param value 文字列
 * @param options オプション
 * @returns 整えられた文字列
 */
const normalizeString = (
  value: string,
  options: NormalizeStringOptions = {},
): string => _normalizeString(value, options);
normalizeString.dataLast =
  (options: NormalizeStringOptions = {}) =>
  (value: string): string =>
    _normalizeString(value, options);
export default normalizeString;

function _normalizeString(
  value: string,
  options: NormalizeStringOptions = {},
): string {
  if (value) {
    // 文字列あり
    const {
      ignoreCompatibility,
      ignoreComposition,
      ignoreWidth,
      ignoreCase,
      ignoreKana,
      ignoreDakuon,
      ignoreSokuon,
      ignoreYouon,
      ignoreChouon,
      ignoreLineBreak,
      ignoreSpace,
    } = options;
    const transformationTypes: TransformationType[] = [];

    if (ignoreCompatibility) {
      // 合成&互換文字の違いを無視する
      transformationTypes.push(TransformationType.toNfkc);
    } else {
      if (ignoreComposition) {
        // 合成の違いを無視する
        transformationTypes.push(TransformationType.toNfc);
      }
      if (ignoreWidth) {
        // 半角・全角の違いを無視する
        transformationTypes.push(TransformationType.toHalfWidth);
      }
    }

    if (ignoreCase) {
      // 英字の大文字・小文字の違いを無視する
      transformationTypes.push(TransformationType.toLowerCase);
    }

    if (ignoreKana) {
      // ひらがな・カタカナの違いを無視する
      transformationTypes.push(TransformationType.toHiragana);
    }

    if (ignoreDakuon) {
      // 濁音(ば)・半濁音(ぱ)と清音(は)の違いを無視する
      transformationTypes.push(TransformationType.toHiraganaSeionFromDakuon);
      if (!ignoreKana) {
        transformationTypes.push(TransformationType.toKatakanaSeionFromDakuon);
      }
    }

    if (ignoreSokuon) {
      // 促音(っ)と清音(つ)の違いを無視する
      transformationTypes.push(TransformationType.toHiraganaSeionFromSokuon);
      if (!ignoreKana) {
        transformationTypes.push(TransformationType.toKatakanaSeionFromSokuon);
      }
    }

    if (ignoreYouon) {
      // 拗音(ゃ)と清音(や)の違いを無視する
      transformationTypes.push(TransformationType.toHiraganaSeionFromYouon);
      if (!ignoreKana) {
        transformationTypes.push(TransformationType.toKatakanaSeionFromYouon);
      }
    }

    if (ignoreChouon) {
      // 長音(ー)を無視する
      transformationTypes.push(TransformationType.removeChouon);
    }

    if (ignoreLineBreak) {
      // 改行を無視する
      transformationTypes.push(TransformationType.removeLineBreaks);
    }

    if (ignoreSpace) {
      // スペースを無視する
      transformationTypes.push(TransformationType.removeWhitespace);
    }

    return transformString(value, transformationTypes);
  } else if (value === null && 'nullValue' in options) {
    // nullの場合は別の値に置き換え
    return options.nullValue;
  } else if (value === undefined && 'undefinedValue' in options) {
    // undefinedの場合は別の値に置き換え
    return options.undefinedValue;
  } else {
    // 上記以外はそのまま返す
    return value;
  }
}
