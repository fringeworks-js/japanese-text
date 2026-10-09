import type { ReplacementMapDefinition } from './types';

export default function createReplacementMapComposer() {
  const cache = new Map<string, Map<string, string>>();

  const composer = (
    definitions: ReplacementMapDefinition[],
  ): Map<string, string> => {
    const ids: string[] = [];
    const maps: [string, string][][] = [];
    for (const definition of definitions) {
      if (definition) {
        ids.push(definition.id);
        maps.push(definition.map);
      }
    }

    const cacheKey = ids.sort().join('|');
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    const composed = new Map<string, string>();
    for (const map of maps) {
      for (const item of map) {
        composed.set(item[0], item[1]);
      }
    }

    cache.set(cacheKey, composed);
    return composed;
  };

  // テストや緊急時用にキャッシュを空にするメソッドを追加
  composer.clearCache = () => {
    cache.clear();
  };

  return composer;
}
