/**
 * 変換テーブル
 * 合成したmapはテーブルのオブジェクトごとにキャッシュするため、定数として定義して使い回す
 */
export type ConversionTable = {
  /**
   * 変換前と変換後の文字列の組
   */
  readonly entries: readonly (readonly [string, string])[];
};
