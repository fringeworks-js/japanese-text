import type { ChouonVariant } from './constants';

export type UnifyChouonOptions = {
  /**
   * 統一後の文字\
   * 指定しない場合は、直前のかなの幅に合わせる（全角のかなの後は `ー`、半角カタカナの後は `ｰ`。`always` の場合は `ー`）
   */
  to?: ChouonVariant;

  /**
   * かなの直後かどうかに関係なく、すべて統一する
   * @default false
   */
  always?: boolean;
};
