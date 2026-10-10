export type TransformStringOptions = {
  /**
   * 指定した変換種別の中で変換テーブルを使う変換が連続している場合は1つのテーブルに纏めるか\
   * 纏めた方がパフォーマンス面で有利だが、変換種別の組み合わせによっては纏めなかった場合とは結果が異なることがある点に注意
   *
   * - false: 纏めない
   * - true: 纏める
   */
  composeTables?: boolean;
};
