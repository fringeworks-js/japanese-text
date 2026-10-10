export type ToKatakanaSeionOptions = {
  /**
   * 濁音は変換せずに残す
   * @default false
   */
  keepDakuon?: boolean;

  /**
   * 促音は変換せずに残す
   * @default false
   */
  keepSokuon?: boolean;

  /**
   * 拗音は変換せずに残す
   * @default false
   */
  keepYouon?: boolean;
};
