import { swapPairs } from '@fringeworks/utils/array/swapPairs';
import type { ConversionTable } from '../_internal/_createConversionTableComposer';
import {
  TO_FULL_WIDTH,
  TO_FULL_WIDTH_ALPHABET,
  TO_FULL_WIDTH_KANA,
  TO_FULL_WIDTH_NUMBER,
  TO_FULL_WIDTH_SIGN,
  TO_FULL_WIDTH_SPACE,
} from '../toFullWidth/constants';

/**
 * アルファベットの全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_ALPHABET = {
  id: 'toHalfWidthAlphabet',
  entries: swapPairs(TO_FULL_WIDTH_ALPHABET.entries),
} as const satisfies ConversionTable;

/**
 * 数字の全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_NUMBER = {
  id: 'toHalfWidthNumber',
  entries: swapPairs(TO_FULL_WIDTH_NUMBER.entries),
} as const satisfies ConversionTable;

/**
 * 記号の全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_SIGN = {
  id: 'toHalfWidthSign',
  entries: swapPairs(TO_FULL_WIDTH_SIGN.entries),
} as const satisfies ConversionTable;

/**
 * スペースの全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_SPACE = {
  id: 'toHalfWidthSpace',
  entries: swapPairs(TO_FULL_WIDTH_SPACE.entries),
} as const satisfies ConversionTable;

/**
 * スペースの全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_KANA = {
  id: 'toHalfWidthKana',
  entries: swapPairs(TO_FULL_WIDTH_KANA.entries),
} as const satisfies ConversionTable;

/**
 * 全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH = {
  id: 'toHalfWidth',
  entries: swapPairs(TO_FULL_WIDTH.entries),
} as const satisfies ConversionTable;
