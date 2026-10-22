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
 * @param str 文字列
 * @param options オプション
 * @returns 整えられた文字列
 */
export default function normalizeString(
  str: string,
  options: NormalizeStringOptions = {},
): string {
  if (!str) {
    return str;
  }

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
    ignoreChouonVariant,
    ignoreHyphenVariant,
    ignoreSpaceVariant,
    ignoreTildeVariant,
    ignoreMiddleDotVariant,
    ignoreLineBreak,
    ignoreSpace,
  } = options;
  // 合成の違いを無視するか（NFKC は NFC を含む）
  const composes = ignoreCompatibility || ignoreComposition;
  const transformationTypes: TransformationType[] = [];

  if (ignoreCompatibility) {
    // 合成&互換文字の違いを無視する
    transformationTypes.push(TransformationType.toNfkc);
  } else if (ignoreComposition) {
    // 合成の違いを無視する
    transformationTypes.push(TransformationType.toNfc);
  }

  // 前後の文字を見ない統一は、統一した文字の幅もそろえられるよう全角・半角の変換の前に行う
  if (ignoreSpaceVariant) {
    // スペースの種類の違いを無視する
    transformationTypes.push(TransformationType.unifySpaces);
  }

  if (ignoreTildeVariant) {
    // 波線の種類の違いを無視する
    transformationTypes.push(TransformationType.unifyTildes);
  }

  if (ignoreMiddleDotVariant) {
    // 中黒の種類の違いを無視する
    transformationTypes.push(TransformationType.unifyMiddleDots);
  }

  if (ignoreWidth && !ignoreCompatibility) {
    // 半角・全角の違いを無視する
    // かなを扱う変換は全角のカナが対象なので、かなはいったん全角にそろえる
    transformationTypes.push(
      TransformationType.toHalfWidthAlphabet,
      TransformationType.toHalfWidthNumber,
      TransformationType.toHalfWidthSymbol,
      TransformationType.toHalfWidthSpace,
      TransformationType.toFullWidthKana,
    );
  }

  let result = str;
  if (ignoreDakuon) {
    // 単独の濁点・半濁点を除去する（濁音・半濁音の変換は後で行う）
    // 除去すると隣り合う文字が変わるため、前後の文字で判断する統一より先に行う。
    // 半角の濁点を全角のかなと合成したり、互換文字の濁点を分解したりした後に除去するため、
    // ここまでの変換を先に行う
    result = transformString(result, transformationTypes).replace(
      REGEX_DAKUTEN,
      '',
    );
    clearArrayMutable(transformationTypes);
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

  // 長音とハイフンは、かなの直後かで判断するため、全角・半角の変換と、間の文字の除去の後に行う
  if (ignoreChouonVariant) {
    // 長音の代わりに使われた記号を長音にそろえる
    transformationTypes.push(TransformationType.unifyChouon);
  }

  if (ignoreHyphenVariant) {
    // ハイフンの代わりに使われた記号をハイフンにそろえる（長音の除去で消えないよう、除去の前に行う）
    transformationTypes.push(TransformationType.unifyHyphens);
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

  if (
    composes &&
    (ignoreCase || ignoreKana || ignoreDakuon || ignoreSokuon || ignoreYouon)
  ) {
    // 変換で崩れた合成を整える
    // （清音にした文字と後ろに残った濁点、小文字化で生じた結合文字の順序など）
    transformationTypes.push(TransformationType.toNfc);
  }

  if (ignoreWidth && !ignoreCompatibility && !ignoreKana) {
    // 全角にそろえておいたかなを半角に戻す（ひらがなにした場合は全角のまま）
    transformationTypes.push(TransformationType.toHalfWidthKana);
  }

  return transformString(result, transformationTypes);
}
