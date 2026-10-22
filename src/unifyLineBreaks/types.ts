import type { LineBreakVariant } from './constants';

export type UnifyLineBreaksOptions = {
  /**
   * 統一後の文字
   * @default '\n'
   */
  to?: LineBreakVariant;
};
