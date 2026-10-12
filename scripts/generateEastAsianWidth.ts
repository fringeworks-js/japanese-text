/**
 * Unicode Character Database の EastAsianWidth.txt から、
 * src/_internal/_getEastAsianWidth/ranges.ts を生成する
 *
 * 使い方:
 *   pnpm generateEastAsianWidth            # 最新版をダウンロードして生成
 *   pnpm generateEastAsianWidth <path|url>  # 指定のファイルから生成
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_SOURCE =
  'https://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt';

const OUTPUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../src/_internal/_getEastAsianWidth/ranges.ts',
);

/**
 * East_Asian_Width の値と出力する種別の対応（N は出力しない）
 */
const CATEGORIES: Record<string, string> = {
  Na: 'narrow',
  H: 'narrow',
  W: 'wide',
  F: 'wide',
  A: 'ambiguous',
};

const LINE_PATTERN = /^([0-9A-F]+)(?:\.\.([0-9A-F]+))?\s*;\s*(\w+)/;

async function load(source: string): Promise<string> {
  if (/^https?:\/\//.test(source)) {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${source}: ${response.status}`);
    }
    return response.text();
  }
  return readFile(source, 'utf8');
}

function toHex(codePoint: number): string {
  return '0x' + codePoint.toString(16).padStart(4, '0');
}

async function main() {
  const source = process.argv[2] ?? DEFAULT_SOURCE;
  const text = await load(source);
  const version = text.match(/^# (EastAsianWidth-[\d.]+\.txt)/m)?.[1];
  if (!version) {
    throw new Error('Unknown file format');
  }

  // 範囲の抽出
  const ranges: [number, number, string][] = [];
  for (const line of text.split(/\r?\n/)) {
    const match = LINE_PATTERN.exec(line);
    if (!match) {
      continue;
    }
    // 1番目と3番目のグループは必須なので、マッチした場合は必ずある
    const category = CATEGORIES[match[3]!];
    if (!category) {
      continue;
    }
    const start = parseInt(match[1]!, 16);
    const end = match[2] ? parseInt(match[2], 16) : start;
    ranges.push([start, end, category]);
  }
  ranges.sort((a, b) => a[0] - b[0]);

  // 連続する同じ種別の範囲を結合
  const merged: [number, number, string][] = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && last[2] === range[2] && last[1] + 1 === range[0]) {
      last[1] = range[1];
    } else {
      merged.push([...range]);
    }
  }

  const rows = merged
    .map(
      ([start, end, category]) =>
        `  [${toHex(start)}, ${toHex(end)}, '${category}'],`,
    )
    .join('\n');
  const content = `// このファイルは scripts/generateEastAsianWidth.ts で生成されています。直接編集しないでください
// Source: ${version}
import type { EastAsianWidthRange } from './types';

/**
 * East Asian Width の範囲（開始, 終了, 種別）の昇順の一覧
 * 一覧にないコードポイントは N（中立）
 */
export const EAST_ASIAN_WIDTH_RANGES: readonly EastAsianWidthRange[] = [
${rows}
];
`;
  await writeFile(OUTPUT, content);
  console.log(`${version}: ${merged.length} ranges -> ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
