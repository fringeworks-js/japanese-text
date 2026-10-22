import { swapPairs } from '@fringeworks/utils/array/swapPairs';
import type { ConversionTable } from '../_internal/_createConversionTableComposer';
import {
  TO_FULL_WIDTH,
  TO_FULL_WIDTH_ALPHABET,
  TO_FULL_WIDTH_KANA,
  TO_FULL_WIDTH_NUMBER,
  TO_FULL_WIDTH_SPACE,
  TO_FULL_WIDTH_SYMBOL,
} from '../toFullWidth/constants';

/**
 * アルファベットの全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_ALPHABET: ConversionTable = {
  entries: swapPairs(TO_FULL_WIDTH_ALPHABET.entries),
};

/**
 * 数字の全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_NUMBER: ConversionTable = {
  entries: swapPairs(TO_FULL_WIDTH_NUMBER.entries),
};

/**
 * 記号の全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_SYMBOL: ConversionTable = {
  entries: swapPairs(TO_FULL_WIDTH_SYMBOL.entries),
};

/**
 * スペースの全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_SPACE: ConversionTable = {
  entries: swapPairs(TO_FULL_WIDTH_SPACE.entries),
};

/**
 * 半角カナ（カタカナと、句読点・かぎ括弧・中黒・長音符・濁点・半濁点）の全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_KANA: ConversionTable = {
  entries: swapPairs(TO_FULL_WIDTH_KANA.entries),
};

/**
 * 全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH: ConversionTable = {
  entries: swapPairs(TO_FULL_WIDTH.entries),
};
