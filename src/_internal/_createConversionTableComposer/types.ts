export type ConversionTable<T extends string = string> = {
  /**
   * ID（合成したmapのキャッシュに使う）
   */
  readonly id: T;

  /**
   * 変換前と変換後の文字列の組
   */
  entries: [string, string][];
};
