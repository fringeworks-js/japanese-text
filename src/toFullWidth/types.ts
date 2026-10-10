export type ToFullWidthOptions = {
  /**
   * アルファベットは変換せずに残す
   * @default false
   */
  keepAlphabet?: boolean;

  /**
   * 数字は変換せずに残す
   * @default false
   */
  keepNumber?: boolean;

  /**
   * 記号は変換せずに残す
   * @default false
   */
  keepSign?: boolean;

  /**
   * スペースは変換せずに残す
   * @default false
   */
  keepSpace?: boolean;

  /**
   * カタカナは変換せずに残す
   * @default false
   */
  keepKana?: boolean;
};
