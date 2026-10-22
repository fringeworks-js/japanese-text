import { toCamelCase } from '@fringeworks/utils/string/toCamelCase';
import { toDotCase } from '@fringeworks/utils/string/toDotCase';
import { toFlatCase } from '@fringeworks/utils/string/toFlatCase';
import { toKebabCase } from '@fringeworks/utils/string/toKebabCase';
import { toLowerCase } from '@fringeworks/utils/string/toLowerCase';
import { toPascalCase } from '@fringeworks/utils/string/toPascalCase';
import { toScreamingSnakeCase } from '@fringeworks/utils/string/toScreamingSnakeCase';
import { toSentenceCase } from '@fringeworks/utils/string/toSentenceCase';
import { toSnakeCase } from '@fringeworks/utils/string/toSnakeCase';
import { toTitleCase } from '@fringeworks/utils/string/toTitleCase';
import { toTrainCase } from '@fringeworks/utils/string/toTrainCase';
import { toUpperCase } from '@fringeworks/utils/string/toUpperCase';
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
  TO_FULL_WIDTH_SPACE,
  TO_FULL_WIDTH_SYMBOL,
} from '../toFullWidth/constants';
import {
  TO_HALF_WIDTH,
  TO_HALF_WIDTH_ALPHABET,
  TO_HALF_WIDTH_KANA,
  TO_HALF_WIDTH_NUMBER,
  TO_HALF_WIDTH_SPACE,
  TO_HALF_WIDTH_SYMBOL,
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
import { unifyChouon } from '../unifyChouon';
import { unifyDoubleQuotes } from '../unifyDoubleQuotes';
import { unifyHyphens } from '../unifyHyphens';
import { unifyLineBreaks } from '../unifyLineBreaks';
import { unifyMiddleDots } from '../unifyMiddleDots';
import { unifySingleQuotes } from '../unifySingleQuotes';
import { unifySpaces } from '../unifySpaces';
import { unifyTildes } from '../unifyTildes';
import type { TransformationType } from './constants';

/**
 * 変換テーブルで変換する変換の種類と、変換に使うテーブル
 */
export const TRANSFORMATION_TABLES: Partial<
  Record<TransformationType, ConversionTable>
> = {
  toFullWidth: TO_FULL_WIDTH,
  toFullWidthAlphabet: TO_FULL_WIDTH_ALPHABET,
  toFullWidthNumber: TO_FULL_WIDTH_NUMBER,
  toFullWidthSymbol: TO_FULL_WIDTH_SYMBOL,
  toFullWidthSpace: TO_FULL_WIDTH_SPACE,
  toFullWidthKana: TO_FULL_WIDTH_KANA,
  toHalfWidth: TO_HALF_WIDTH,
  toHalfWidthAlphabet: TO_HALF_WIDTH_ALPHABET,
  toHalfWidthNumber: TO_HALF_WIDTH_NUMBER,
  toHalfWidthSymbol: TO_HALF_WIDTH_SYMBOL,
  toHalfWidthSpace: TO_HALF_WIDTH_SPACE,
  toHalfWidthKana: TO_HALF_WIDTH_KANA,
  toHiragana: TO_HIRAGANA,
  toHiraganaSeion: TO_HIRAGANA_SEION,
  toHiraganaSeionFromDakuon: TO_HIRAGANA_SEION_FROM_DAKUON,
  toHiraganaSeionFromSokuon: TO_HIRAGANA_SEION_FROM_SOKUON,
  toHiraganaSeionFromYouon: TO_HIRAGANA_SEION_FROM_YOUON,
  toKatakana: TO_KATAKANA,
  toKatakanaSeion: TO_KATAKANA_SEION,
  toKatakanaSeionFromDakuon: TO_KATAKANA_SEION_FROM_DAKUON,
  toKatakanaSeionFromSokuon: TO_KATAKANA_SEION_FROM_SOKUON,
  toKatakanaSeionFromYouon: TO_KATAKANA_SEION_FROM_YOUON,
  removeChouon: REMOVE_CHOUON,
  removeLineBreaks: REMOVE_LINE_BREAKS,
  removeWhitespace: REMOVE_WHITESPACE,
  removeSpaces: REMOVE_SPACES,
};

/**
 * 関数で変換する変換の種類と、変換に使う関数
 */
export const TRANSFORMATION_FUNCTIONS: Partial<
  Record<TransformationType, (str: string) => string>
> = {
  toCamelCase: toCamelCase,
  toDotCase: toDotCase,
  toFlatCase: toFlatCase,
  toKebabCase: toKebabCase,
  toLowerCase: toLowerCase,
  toPascalCase: toPascalCase,
  toScreamingSnakeCase: toScreamingSnakeCase,
  toSentenceCase: toSentenceCase,
  toSnakeCase: toSnakeCase,
  toTitleCase: toTitleCase,
  toTrainCase: toTrainCase,
  toUpperCase: toUpperCase,
  toNfc: toNfc,
  toNfd: toNfd,
  toNfkc: toNfkc,
  toNfkd: toNfkd,
  unifyChouon: unifyChouon,
  unifyDoubleQuotes: unifyDoubleQuotes,
  unifyHyphens: unifyHyphens,
  unifyLineBreaks: unifyLineBreaks,
  unifyMiddleDots: unifyMiddleDots,
  unifySingleQuotes: unifySingleQuotes,
  unifySpaces: unifySpaces,
  unifyTildes: unifyTildes,
};
