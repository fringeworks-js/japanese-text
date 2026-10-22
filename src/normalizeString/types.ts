/**
 * オプション
 */
export type NormalizeStringOptions = {
  /**
   * 合成&互換文字の違いを無視する
   */
  ignoreCompatibility?: boolean;

  /**
   * 合成の違いを無視する
   */
  ignoreComposition?: boolean;

  /**
   * 半角・全角の違いを無視する
   */
  ignoreWidth?: boolean;

  /**
   * 英字の大文字・小文字の違いを無視する
   */
  ignoreCase?: boolean;

  /**
   * ひらがな・カタカナの違いを無視する
   */
  ignoreKana?: boolean;

  /**
   * 濁音(ば)・半濁音(ぱ)と清音(は)の違いを無視する\
   * 単独の濁点・半濁点（゛、ﾞ、結合用の濁点など）は除去する
   */
  ignoreDakuon?: boolean;

  /**
   * 促音(っ)と清音(つ)の違いを無視する
   */
  ignoreSokuon?: boolean;

  /**
   * 拗音(ゃ)と清音(や)の違いを無視する
   */
  ignoreYouon?: boolean;

  /**
   * 長音(ー)を無視する
   */
  ignoreChouon?: boolean;

  /**
   * 長音の表記の違いを無視する\
   * かなの直後にある、長音の代わりに使われた記号（`―`、`－`、`-`、`〜` など）を長音(ー)にそろえる
   */
  ignoreChouonVariant?: boolean;

  /**
   * ハイフンの表記の違いを無視する\
   * かなの直後にない、ハイフンの代わりに使われた記号（`－`、`―`、`−`、`ー` など）をハイフン(-)にそろえる
   */
  ignoreHyphenVariant?: boolean;

  /**
   * スペースの種類の違いを無視する\
   * 全角スペース、ノーブレークスペースなどを半角スペースにそろえる
   */
  ignoreSpaceVariant?: boolean;

  /**
   * 波線の種類の違いを無視する\
   * 波ダッシュ（〜）、半角チルダ（~）などを全角チルダ（～）にそろえる
   */
  ignoreTildeVariant?: boolean;

  /**
   * 中黒の種類の違いを無視する\
   * 半角の中黒（･）、欧文の中点（·）などを中黒（・）にそろえる
   */
  ignoreMiddleDotVariant?: boolean;

  /**
   * 改行（CR、LF、Unicodeの行区切り・段落区切り）を無視する
   */
  ignoreLineBreak?: boolean;

  /**
   * 改行以外の空白文字（半角・全角スペース、タブ、ノーブレークスペースなど）を無視する
   */
  ignoreSpace?: boolean;
};
