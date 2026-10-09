import { swapPairs } from '@fringeworks/utils/array/swapPairs';
import type { ReplacementMapDefinition } from '../_internal/_createReplacementMapComposer';
import {
  TO_FULL_WIDTH,
  TO_FULL_WIDTH_ALPHABET,
  TO_FULL_WIDTH_KANA,
  TO_FULL_WIDTH_NUMBER,
  TO_FULL_WIDTH_SIGN,
  TO_FULL_WIDTH_SPACE,
} from '../retypeToFullWidth/constants';

/**
 * アルファベットの全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_ALPHABET = {
  id: 'toHalfWidthAlphabet',
  map: swapPairs(TO_FULL_WIDTH_ALPHABET.map),
} as const satisfies ReplacementMapDefinition;

/**
 * 数字の全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_NUMBER = {
  id: 'toHalfWidthNumber',
  map: swapPairs(TO_FULL_WIDTH_NUMBER.map),
} as const satisfies ReplacementMapDefinition;

/**
 * 記号の全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_SIGN = {
  id: 'toHalfWidthSign',
  map: swapPairs(TO_FULL_WIDTH_SIGN.map),
} as const satisfies ReplacementMapDefinition;

/**
 * スペースの全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_SPACE = {
  id: 'toHalfWidthSpace',
  map: swapPairs(TO_FULL_WIDTH_SPACE.map),
} as const satisfies ReplacementMapDefinition;

/**
 * スペースの全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH_KANA = {
  id: 'toHalfWidthKana',
  map: swapPairs(TO_FULL_WIDTH_KANA.map),
} as const satisfies ReplacementMapDefinition;

/**
 * 全角 -> 半角を変換する為のマップ
 */
export const TO_HALF_WIDTH = {
  id: 'toHalfWidth',
  map: swapPairs(TO_FULL_WIDTH.map),
} as const satisfies ReplacementMapDefinition;
