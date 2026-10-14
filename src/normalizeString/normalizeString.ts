import { clearArrayMutable } from '@fringeworks/utils/array/clearArrayMutable';
import { transformString } from '../transformString';
import { TransformationType } from '../transformString/constants';
import type { NormalizeStringOptions } from './types';

/**
 * 濁点・半濁点（結合用、単独、半角）
 */
const REGEX_DAKUTEN = /[\u3099-\u309c\uff9e\uff9f]/g;

/**
 * 文字列の表記揺れを無くし、比較可能な形に整える
 * @param value 文字列
 * @param options オプション
 * @returns 整えられた文字列
 */
export default function normalizeString(
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
    // 合成の違いを無視するか（NFKC は NFC を含む）
    const composes = ignoreCompatibility || ignoreComposition;
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
        if (ignoreKana) {
          // ひらがなへの変換は全角のカタカナが対象なので、かなだけは全角にそろえる
          transformationTypes.push(
            TransformationType.toHalfWidthAlphabet,
            TransformationType.toHalfWidthNumber,
            TransformationType.toHalfWidthSign,
            TransformationType.toHalfWidthSpace,
            TransformationType.toFullWidthKana,
          );
        } else {
          transformationTypes.push(TransformationType.toHalfWidth);
        }
      }
    }

    // 文字を除去する変換は、除去して隣り合った文字を合成できるよう先に行う
    if (ignoreLineBreak) {
      // 改行を無視する
      transformationTypes.push(TransformationType.removeLineBreaks);
    }

    if (ignoreSpace) {
      // スペースを無視する
      transformationTypes.push(TransformationType.removeWhitespace);
    }

    if (ignoreChouon) {
      // 長音(ー)を無視する
      transformationTypes.push(TransformationType.removeChouon);
    }

    if (composes && (ignoreLineBreak || ignoreSpace || ignoreChouon)) {
      // 除去して隣り合った文字を合成する
      transformationTypes.push(TransformationType.toNfc);
    }

    if (ignoreCase) {
      // 英字の大文字・小文字の違いを無視する
      transformationTypes.push(TransformationType.toLowerCase);
    }

    if (ignoreKana) {
      // ひらがな・カタカナの違いを無視する
      transformationTypes.push(TransformationType.toHiragana);
    }

    let result = value;
    if (ignoreDakuon) {
      // 濁音(ば)・半濁音(ぱ)と清音(は)の違いを無視する
      transformationTypes.push(TransformationType.toHiraganaSeionFromDakuon);
      if (!ignoreKana) {
        transformationTypes.push(TransformationType.toKatakanaSeionFromDakuon);
      }
      // 単独の濁点・半濁点を除去するため、ここまでの変換を先に行う
      result = transformString(result, transformationTypes).replace(
        REGEX_DAKUTEN,
        '',
      );
      clearArrayMutable(transformationTypes);
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

    if (
      composes &&
      (ignoreCase || ignoreKana || ignoreDakuon || ignoreSokuon || ignoreYouon)
    ) {
      // 変換で崩れた合成を整える
      // （清音にした文字と後ろに残った濁点、小文字化で生じた結合文字の順序など）
      transformationTypes.push(TransformationType.toNfc);
    }

    return transformString(result, transformationTypes);
  } else if (value === null && 'nullValue' in options) {
    // nullの場合は別の値に置き換え
    return options.nullValue as string;
  } else if (value === undefined && 'undefinedValue' in options) {
    // undefinedの場合は別の値に置き換え
    return options.undefinedValue as string;
  } else {
    // 上記以外はそのまま返す
    return value;
  }
}
