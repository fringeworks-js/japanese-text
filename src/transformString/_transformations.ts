import { recaseCamel } from '@fringeworks/utils/string/recaseCamel';
import { recaseKebab } from '@fringeworks/utils/string/recaseKebab';
import { recaseLower } from '@fringeworks/utils/string/recaseLower';
import { recasePascal } from '@fringeworks/utils/string/recasePascal';
import { recaseScreamingSnake } from '@fringeworks/utils/string/recaseScreamingSnake';
import { recaseSnake } from '@fringeworks/utils/string/recaseSnake';
import { recaseTitle } from '@fringeworks/utils/string/recaseTitle';
import { recaseUpper } from '@fringeworks/utils/string/recaseUpper';
import type { ReplacementMapDefinition } from '../retype';
import {
  TO_FULL_WIDTH,
  TO_FULL_WIDTH_ALPHABET,
  TO_FULL_WIDTH_KANA,
  TO_FULL_WIDTH_NUMBER,
  TO_FULL_WIDTH_SIGN,
  TO_FULL_WIDTH_SPACE,
} from '../retypeToFullWidth/constants';
import {
  TO_HALF_WIDTH,
  TO_HALF_WIDTH_ALPHABET,
  TO_HALF_WIDTH_KANA,
  TO_HALF_WIDTH_NUMBER,
  TO_HALF_WIDTH_SIGN,
  TO_HALF_WIDTH_SPACE,
} from '../retypeToHalfWidth/constants';
import { TO_HIRAGANA } from '../retypeToHiragana/constants';
import {
  TO_HIRAGANA_SEION,
  TO_HIRAGANA_SEION_FROM_DAKUON,
  TO_HIRAGANA_SEION_FROM_SOKUON,
  TO_HIRAGANA_SEION_FROM_YOUON,
} from '../retypeToHiraganaSeion/constants';
import { TO_KATAKANA } from '../retypeToKatakana/constants';
import {
  TO_KATAKANA_SEION,
  TO_KATAKANA_SEION_FROM_DAKUON,
  TO_KATAKANA_SEION_FROM_SOKUON,
  TO_KATAKANA_SEION_FROM_YOUON,
} from '../retypeToKatakanaSeion/constants';
import { retypeToNfc } from '../retypeToNfc';
import { retypeToNfd } from '../retypeToNfd';
import { retypeToNfkc } from '../retypeToNfkc';
import { retypeToNfkd } from '../retypeToNfkd';
import { TO_NO_CHOUON } from '../retypeToNoChouon/constants';
import { TO_NO_LINE_FEED } from '../retypeToNoLineFeed/constants';
import { TO_NO_SPACE } from '../retypeToNoSpace/constants';
import { TO_NO_WHITESPACE } from '../retypeToNoWhitespace/constants';
import type { TransformationType } from './constants';

/**
 * マップで置換する変換の種類と、置換に使うマップ
 */
export const TRANSFORMATION_MAPS: Partial<
  Record<TransformationType, ReplacementMapDefinition>
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
  [TO_NO_CHOUON.id]: TO_NO_CHOUON,
  [TO_NO_LINE_FEED.id]: TO_NO_LINE_FEED,
  [TO_NO_WHITESPACE.id]: TO_NO_WHITESPACE,
  [TO_NO_SPACE.id]: TO_NO_SPACE,
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
  toNfc: retypeToNfc,
  toNfd: retypeToNfd,
  toNfkc: retypeToNfkc,
  toNfkd: retypeToNfkd,
};
