import type { ConversionTable } from './types';

/**
 * 合成したmapのキャッシュの節
 * 渡されたテーブルを順にたどり、たどり着いた節に合成したmapを持つ
 */
type CacheNode = {
  /**
   * ここまでのテーブルを合成したmap
   */
  composed?: Map<string, string>;

  /**
   * 次のテーブルごとの節
   */
  next?: WeakMap<ConversionTable, CacheNode>;
};

export default function createConversionTableComposer() {
  // テーブルのオブジェクト自体をキーにするため、使われなくなったテーブルの分はGCで消える
  let root: CacheNode = {};

  // false などの値は読み飛ばす（条件付きで変換表を並べられるようにする）
  const composer = (
    tables: readonly (ConversionTable | false | null | undefined)[],
  ): Map<string, string> => {
    // 後のテーブルが優先されるため、順番もキーに含める
    const targets: ConversionTable[] = [];
    let node = root;
    for (const table of tables) {
      if (table) {
        targets.push(table);
        node.next ??= new WeakMap();
        let child = node.next.get(table);
        if (!child) {
          child = {};
          node.next.set(table, child);
        }
        node = child;
      }
    }

    if (node.composed) {
      return node.composed;
    }

    const composed = new Map<string, string>();
    for (const table of targets) {
      for (const [from, to] of table.entries) {
        composed.set(from, to);
      }
    }

    node.composed = composed;
    return composed;
  };

  // テストや緊急時用にキャッシュを空にするメソッドを追加
  composer.clearCache = () => {
    root = {};
  };

  return composer;
}
