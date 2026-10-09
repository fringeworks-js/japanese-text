export type RetypeToFullWidthOptions = {
  /**
   * アルファベットは変換しない
   * @default false
   */
  disableAlphabet?: boolean;

  /**
   * 数字は変換しない
   * @default false
   */
  disableNumber?: boolean;

  /**
   * 記号は変換しない
   * @default false
   */
  disableSign?: boolean;

  /**
   * スペースは変換しない
   * @default false
   */
  disableSpace?: boolean;

  /**
   * カタカナは変換しない
   * @default false
   */
  disableKana?: boolean;
};
