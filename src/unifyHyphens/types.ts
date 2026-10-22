import type { HyphenVariant } from './constants';

export type UnifyHyphensOptions = {
  /**
   * 統一後の文字
   * @default '-'
   */
  to?: HyphenVariant;

  /**
   * かなの直後かどうかに関係なく、すべて統一する（長音記号もハイフンにする）
   * @default false
   */
  always?: boolean;
};
