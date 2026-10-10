import { recaseCamel } from '@fringeworks/utils/string/recaseCamel';
import { recaseKebab } from '@fringeworks/utils/string/recaseKebab';
import { recaseLower } from '@fringeworks/utils/string/recaseLower';
import { recasePascal } from '@fringeworks/utils/string/recasePascal';
import { recaseScreamingSnake } from '@fringeworks/utils/string/recaseScreamingSnake';
import { recaseSnake } from '@fringeworks/utils/string/recaseSnake';
import { recaseTitle } from '@fringeworks/utils/string/recaseTitle';
import { recaseUpper } from '@fringeworks/utils/string/recaseUpper';
import type { ConversionTable } from '../convertByTable';
import { REMOVE_CHOUON } from '../removeChouon/constants';
import { REMOVE_LINE_BREAKS } from '../removeLineBreaks/constants';
import { REMOVE_SPACES } from '../removeSpaces/constants';
import { REMOVE_WHITESPACE } from '../removeWhitespace/constants';
import {
  TO_FULL_WIDTH,
  TO_FULL_WIDTH_ALPHABET,
  TO_FULL_WIDTH_KANA,
  TO_FULL_WIDTH_NUMBER,
  TO_FULL_WIDTH_SIGN,
  TO_FULL_WIDTH_SPACE,
} from '../toFullWidth/constants';
import {
  TO_HALF_WIDTH,
  TO_HALF_WIDTH_ALPHABET,
  TO_HALF_WIDTH_KANA,
  TO_HALF_WIDTH_NUMBER,
  TO_HALF_WIDTH_SIGN,
  TO_HALF_WIDTH_SPACE,
} from '../toHalfWidth/constants';
import { TO_HIRAGANA } from '../toHiragana/constants';
import {
  TO_HIRAGANA_SEION,
  TO_HIRAGANA_SEION_FROM_DAKUON,
  TO_HIRAGANA_SEION_FROM_SOKUON,
  TO_HIRAGANA_SEION_FROM_YOUON,
} from '../toHiraganaSeion/constants';
import { TO_KATAKANA } from '../toKatakana/constants';
import {
  TO_KATAKANA_SEION,
  TO_KATAKANA_SEION_FROM_DAKUON,
  TO_KATAKANA_SEION_FROM_SOKUON,
  TO_KATAKANA_SEION_FROM_YOUON,
} from '../toKatakanaSeion/constants';
import { toNfc } from '../toNfc';
import { toNfd } from '../toNfd';
import { toNfkc } from '../toNfkc';
import { toNfkd } from '../toNfkd';
import type { TransformationType } from './constants';

/**
 * 変換テーブルで変換する変換の種類と、変換に使うテーブル
 */
export const TRANSFORMATION_TABLES: Partial<
  Record<TransformationType, ConversionTable>
> = {
  [TO_FULL_WIDTH.id]: TO_FULL_WIDTH,
  [TO_FULL_WIDTH_ALPHABET.id]: TO_FULL_WIDTH_ALPHABET,
  [TO_FULL_WIDTH_NUMBER.id]: TO_FULL_WIDTH_NUMBER,
  [TO_FULL_WIDTH_SIGN.id]: TO_FULL_WIDTH_SIGN,
  [TO_FULL_WIDTH_SPACE.id]: TO_FULL_WIDTH_SPACE,
  [TO_FULL_WIDTH_KANA.id]: TO_FULL_WIDTH_KANA,
  [TO_HALF_WIDTH.id]: TO_HALF_WIDTH,
  [TO_HALF_WIDTH_ALPHABET.id]: TO_HALF_WIDTH_ALPHABET,
  [TO_HALF_WIDTH_NUMBER.id]: TO_HALF_WIDTH_NUMBER,
  [TO_HALF_WIDTH_SIGN.id]: TO_HALF_WIDTH_SIGN,
  [TO_HALF_WIDTH_SPACE.id]: TO_HALF_WIDTH_SPACE,
  [TO_HALF_WIDTH_KANA.id]: TO_HALF_WIDTH_KANA,
  [TO_HIRAGANA.id]: TO_HIRAGANA,
  [TO_HIRAGANA_SEION.id]: TO_HIRAGANA_SEION,
  [TO_HIRAGANA_SEION_FROM_DAKUON.id]: TO_HIRAGANA_SEION_FROM_DAKUON,
  [TO_HIRAGANA_SEION_FROM_SOKUON.id]: TO_HIRAGANA_SEION_FROM_SOKUON,
  [TO_HIRAGANA_SEION_FROM_YOUON.id]: TO_HIRAGANA_SEION_FROM_YOUON,
  [TO_KATAKANA.id]: TO_KATAKANA,
  [TO_KATAKANA_SEION.id]: TO_KATAKANA_SEION,
  [TO_KATAKANA_SEION_FROM_DAKUON.id]: TO_KATAKANA_SEION_FROM_DAKUON,
  [TO_KATAKANA_SEION_FROM_SOKUON.id]: TO_KATAKANA_SEION_FROM_SOKUON,
  [TO_KATAKANA_SEION_FROM_YOUON.id]: TO_KATAKANA_SEION_FROM_YOUON,
  [REMOVE_CHOUON.id]: REMOVE_CHOUON,
  [REMOVE_LINE_BREAKS.id]: REMOVE_LINE_BREAKS,
  [REMOVE_WHITESPACE.id]: REMOVE_WHITESPACE,
  [REMOVE_SPACES.id]: REMOVE_SPACES,
};

/**
 * 関数で変換する変換の種類と、変換に使う関数
 */
export const TRANSFORMATION_FUNCTIONS: Partial<
  Record<TransformationType, (str: string) => string>
> = {
  toCamelCase: recaseCamel,
  toKebabCase: recaseKebab,
  toLowerCase: recaseLower,
  toPascalCase: recasePascal,
  toScreamingSnakeCase: recaseScreamingSnake,
  toSnakeCase: recaseSnake,
  toTitleCase: recaseTitle,
  toUpperCase: recaseUpper,
  toNfc: toNfc,
  toNfd: toNfd,
  toNfkc: toNfkc,
  toNfkd: toNfkd,
};
