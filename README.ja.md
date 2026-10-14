# @fringeworks/japanese-text

`@fringeworks/japanese-text` は、かな・全角半角・Shift_JIS など、日本語の文字列の変換と判定を行う、誰かにとっては便利なライブラリです。

**[English README is available here](./README.md)**

## インストール

```bash
npm install @fringeworks/japanese-text
# または
pnpm add @fringeworks/japanese-text
```

## 使い方

関数・型・定数は、ルートと関数単位のパスのどちらからでも同じ名前で import できます。関数単位のパスでは、その関数を default import することもできます。

```ts
import { normalizeString } from '@fringeworks/japanese-text';
import normalizeString from '@fringeworks/japanese-text/normalizeString';
```

---

## API

| 関数                                          | 説明                                                  |
| --------------------------------------------- | ----------------------------------------------------- |
| `convertByTable(str, tables)`                 | 変換テーブルに従って文字列を変換する                  |
| `getShiftJisByteLength(str)`                  | Shift_JIS で表した場合のバイト数を返す                |
| `isFullWidth(str, options?)`                  | 全角の文字だけで構成されているか判定する              |
| `isHalfWidth(str, options?)`                  | 半角の文字だけで構成されているか判定する              |
| `isNormalizedEqual(value1, value2, options?)` | 正規化してから2つの文字列が等しいか判定する           |
| `isShiftJisDoubleByte(str)`                   | Shift_JIS の2バイト文字だけで構成されているか判定する |
| `isShiftJisSingleByte(str)`                   | Shift_JIS の1バイト文字だけで構成されているか判定する |
| `normalizeString(value, options?)`            | 表記の揺れを無くし、比較できる形にする                |
| `removeChouon(str)`                           | 長音符（`ー`）を削除する                              |
| `removeLineBreaks(str)`                       | 改行を削除する                                        |
| `removeSpaces(str)`                           | 半角スペース・全角スペースを削除する                  |
| `removeWhitespace(str)`                       | 改行以外の空白文字を削除する                          |
| `toFullWidth(str, options?)`                  | 半角の文字を全角にする                                |
| `toHalfWidth(str, options?)`                  | 全角の文字を半角にする                                |
| `toHiragana(str)`                             | カタカナをひらがなにする                              |
| `toHiraganaSeion(str, options?)`              | ひらがなの濁音・半濁音・促音・拗音を清音にする        |
| `toKatakana(str)`                             | ひらがなをカタカナにする                              |
| `toKatakanaSeion(str, options?)`              | カタカナの濁音・半濁音・促音・拗音を清音にする        |
| `toNfc(data)` など                            | Unicode 正規化を行う                                  |
| `transformString(str, types, options?)`       | 複数の変換を順番に適用する                            |

### `convertByTable`

```ts
convertByTable(str: string, tables: ConversionTable | (ConversionTable | false | null | undefined)[]): string
```

変換テーブルに従って文字列を変換します。複数のテーブルを指定した場合は1つにまとめて変換します。配列の中の `false`・`null`・`undefined` は無視するので、`[useKana && TO_HIRAGANA]` のように条件付きでテーブルを並べられます。まとめたテーブルと変換の処理は `id` ごとにキャッシュするため、同じ `id` には常に同じ `entries` を指定します。

```ts
convertByTable('abc', {
  id: 'myTable',
  entries: [
    ['a', 'A'],
    ['b', 'B'],
  ],
}); // 'ABc'
```

### `getShiftJisByteLength`

```ts
getShiftJisByteLength(str: string | null | undefined): number | null
```

文字列を Shift_JIS で表した場合のバイト数を返します。Shift_JIS は WHATWG Encoding Standard の定義（Windows-31J 相当）に従い、ブラウザーが Shift_JIS のフォームを送信する際の変換と同じ範囲になります。改行などの制御文字は1バイトとして数えます。Shift_JIS で表せない文字（ユーザー定義領域の外字を含む）がある場合は `null` を返します。空文字・`null`・`undefined` の場合は `0` を返します。

```ts
getShiftJisByteLength('aｱあ'); // 4
getShiftJisByteLength('𠮷'); // null
```

### `isFullWidth`

```ts
isFullWidth(str: string, options?: IsFullWidthOptions): boolean
```

文字列が全角の文字だけで構成されているか判定します。Unicode の East Asian Width（UAX #11）が W（Wide）・F（Fullwidth）の文字を全角とします。絵文字も全角です。改行・タブなどの制御文字や、タイ文字などの全角・半角の区別が無い文字（N）はどちらでもないものとします。結合文字・ゼロ幅接合子・異体字セレクターは直前の文字の一部として扱います。空文字の場合は `false` を返します。

```ts
isFullWidth('あいう漢字ＡＢＣ'); // true
isFullWidth('あa'); // false
isFullWidth('①○'); // true
isFullWidth('①○', { ambiguousAs: 'half' }); // false
```

| オプション     | 型               | 説明                                                                                                                                       |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `ambiguousAs?` | `AmbiguousWidth` | 幅が曖昧な文字（East Asian Width が A の文字。`①`、`○`、`※`、`α`、`é` など）の扱い。`'full'`、`'half'`、`'neither'`。デフォルトは `'full'` |

### `isHalfWidth`

```ts
isHalfWidth(str: string, options?: IsHalfWidthOptions): boolean
```

文字列が半角の文字だけで構成されているか判定します。East Asian Width が Na（Narrow）・H（Halfwidth）の文字を半角とします。それ以外の扱いとオプションは `isFullWidth` と同じです。デフォルトでは幅が曖昧な文字を全角として扱うため、`é` などを含む文字列は `false` になります。

```ts
isHalfWidth('abc 123 ｱｲｳ'); // true
isHalfWidth('café'); // false
isHalfWidth('café', { ambiguousAs: 'half' }); // true
```

### `isNormalizedEqual`

```ts
isNormalizedEqual(value1: string, value2: string, options?: IsNormalizedEqualOptions): boolean
```

2つの文字列を `normalizeString` で正規化してから、等しいか判定します。正規化の方法は `normalizeString` のオプションで指定します（何も指定しない場合は正規化しません）。

```ts
isNormalizedEqual('ＡＢＣ', 'abc', { ignoreWidth: true, ignoreCase: true }); // true
```

| オプション     | 型                       | 説明                                   |
| -------------- | ------------------------ | -------------------------------------- |
| `rawFirst?`    | `boolean`                | `true` の場合、`value1` を正規化しない |
| `rawSecond?`   | `boolean`                | `true` の場合、`value2` を正規化しない |
| `ignore*` など | `NormalizeStringOptions` | `normalizeString` のオプション         |

### `isShiftJisDoubleByte`

```ts
isShiftJisDoubleByte(str: string): boolean
```

文字列が Shift_JIS の2バイト文字（JIS X 0208 の文字と、`①` などの Windows-31J の拡張文字）だけで構成されているか判定します。Shift_JIS の定義は `getShiftJisByteLength` と同じです。波ダッシュ（`〜` U+301C）やマイナス記号（`−` U+2212）は Windows-31J では表せないため、含まれる場合は `false` になります。空文字の場合は `false` を返します。

### `isShiftJisSingleByte`

```ts
isShiftJisSingleByte(str: string): boolean
```

文字列が Shift_JIS の1バイト文字（ASCII の表示可能な文字、半角カタカナ、`¥`、`‾`）だけで構成されているか判定します。制御文字は含みません。空文字の場合は `false` を返します。

### `normalizeString`

```ts
normalizeString(value: string, options?: NormalizeStringOptions): string
```

全角・半角や大文字・小文字などの表記の揺れを無くし、検索や比較に使える形にします。どの違いを無くすかはオプションで指定します（何も指定しない場合は変換しません）。`value` が `null` / `undefined` の場合は、`nullValue` / `undefinedValue` を指定していればその値を、そうでなければ `value` をそのまま返します。

```ts
normalizeString('ＡＢＣ', { ignoreWidth: true, ignoreCase: true }); // 'abc'
normalizeString('ガッコウ', {
  ignoreKana: true,
  ignoreDakuon: true,
  ignoreSokuon: true,
}); // 'かつこう'
normalizeString('㈱ｶﾞ', { ignoreCompatibility: true }); // '(株)ガ'
```

| オプション             | 型        | 説明                                                                                                                    |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------- |
| `ignoreCompatibility?` | `boolean` | 互換文字の違いを無視する（NFKC で正規化する）。指定した場合は `ignoreComposition`・`ignoreWidth` は不要                 |
| `ignoreComposition?`   | `boolean` | 合成文字と分解された文字の違いを無視する（NFC で正規化する）                                                            |
| `ignoreWidth?`         | `boolean` | 全角・半角の違いを無視する（半角にそろえる。`ignoreKana` と組み合わせた場合、かなは全角にそろえてからひらがなにする）   |
| `ignoreCase?`          | `boolean` | 英字の大文字・小文字の違いを無視する（小文字にそろえる）                                                                |
| `ignoreKana?`          | `boolean` | ひらがな・カタカナの違いを無視する（ひらがなにそろえる）                                                                |
| `ignoreDakuon?`        | `boolean` | 濁音（`ば`）・半濁音（`ぱ`）と清音（`は`）の違いを無視する。単独の濁点・半濁点（`゛`、`ﾞ`、結合用の濁点など）は除去する |
| `ignoreSokuon?`        | `boolean` | 促音（`っ`）と清音（`つ`）の違いを無視する                                                                              |
| `ignoreYouon?`         | `boolean` | 拗音（`ゃ`）と清音（`や`）の違いを無視する                                                                              |
| `ignoreChouon?`        | `boolean` | 長音符（`ー`）を無視する                                                                                                |
| `ignoreLineBreak?`     | `boolean` | 改行（CR、LF、Unicode の行区切り・段落区切り）を無視する                                                                |
| `ignoreSpace?`         | `boolean` | 改行以外の空白文字（半角・全角スペース、タブ、ノーブレークスペースなど）を無視する                                      |
| `nullValue?`           | `string`  | `value` が `null` の場合に返す値                                                                                        |
| `undefinedValue?`      | `string`  | `value` が `undefined` の場合に返す値                                                                                   |

### `removeChouon`

```ts
removeChouon(str: string): string
```

長音符（`ー`）を削除します。

### `removeLineBreaks`

```ts
removeLineBreaks(str: string): string
```

改行（CR、LF、CRLF、Unicode の行区切り U+2028・段落区切り U+2029）を削除します。

### `removeSpaces`

```ts
removeSpaces(str: string): string
```

半角スペースと全角スペースを削除します。タブなどの他の空白文字も削除する場合は `removeWhitespace` を使います。

### `removeWhitespace`

```ts
removeWhitespace(str: string): string
```

改行以外の空白文字（半角・全角スペース、タブ、ノーブレークスペース、各種の幅のスペースなど）を削除します。改行の削除には `removeLineBreaks` を使います。

### `toFullWidth`

```ts
toFullWidth(str: string, options?: ToFullWidthOptions): string
```

半角の英字・数字・記号・スペース・カタカナを全角にします。

```ts
toFullWidth('abc 123 ｱｲｳ'); // 'ａｂｃ　１２３　アイウ'
toFullWidth('abc 123', { keepNumber: true }); // 'ａｂｃ　123'
```

| オプション      | 型        | 説明                                    |
| --------------- | --------- | --------------------------------------- |
| `keepAlphabet?` | `boolean` | `true` の場合、英字を変換せずに残す     |
| `keepNumber?`   | `boolean` | `true` の場合、数字を変換せずに残す     |
| `keepSign?`     | `boolean` | `true` の場合、記号を変換せずに残す     |
| `keepSpace?`    | `boolean` | `true` の場合、スペースを変換せずに残す |
| `keepKana?`     | `boolean` | `true` の場合、カタカナを変換せずに残す |

### `toHalfWidth`

```ts
toHalfWidth(str: string, options?: ToHalfWidthOptions): string
```

全角の英字・数字・記号・スペース・カタカナを半角にします。オプションは `toFullWidth` と同じです。

### `toHiragana` / `toKatakana`

```ts
toHiragana(str: string): string
toKatakana(str: string): string
```

カタカナをひらがなに（`toHiragana`）、ひらがなをカタカナに（`toKatakana`）します。

### `toHiraganaSeion` / `toKatakanaSeion`

```ts
toHiraganaSeion(str: string, options?: ToHiraganaSeionOptions): string
toKatakanaSeion(str: string, options?: ToKatakanaSeionOptions): string
```

ひらがな（`toHiraganaSeion`）・カタカナ（`toKatakanaSeion`）の濁音・半濁音・促音・拗音を清音にします。

```ts
toHiraganaSeion('がっこう'); // 'かつこう'
toKatakanaSeion('ガッコウ', { keepSokuon: true }); // 'カッコウ'
```

| オプション    | 型        | 説明                                                               |
| ------------- | --------- | ------------------------------------------------------------------ |
| `keepDakuon?` | `boolean` | `true` の場合、濁音・半濁音（`が`、`ぱ` など）を変換せずに残す     |
| `keepSokuon?` | `boolean` | `true` の場合、促音（`っ`）を変換せずに残す                        |
| `keepYouon?`  | `boolean` | `true` の場合、拗音・小書き文字（`ゃ`、`ぁ` など）を変換せずに残す |

### Unicode 正規化

```ts
toNfc(data: string): string
toNfd(data: string): string
toNfkc(data: string): string
toNfkd(data: string): string
```

`String.prototype.normalize` で Unicode 正規化を行います。

| 関数     | 正規化形式 | 例                                           |
| -------- | ---------- | -------------------------------------------- |
| `toNfc`  | NFC        | `か` + 結合用濁点 → `が`                     |
| `toNfd`  | NFD        | `が` → `か` + 結合用濁点                     |
| `toNfkc` | NFKC       | `１２３` → `123`、`ｶﾞ` → `ガ`、`㈱` → `(株)` |
| `toNfkd` | NFKD       | `ｶﾞ` → `カ` + 結合用濁点                     |

### `transformString`

```ts
transformString(str: string, types: TransformationType[], options?: TransformStringOptions): string
```

`types` に指定した変換を、指定した順番に適用します。

```ts
transformString('ﾊﾛｰ', ['toFullWidth', 'toHiragana']); // 'はろー'
transformString('hello world', [TransformationType.toPascalCase]); // 'HelloWorld'
```

変換の種類（`TransformationType` の値）は次のとおりです。

| 種類               | 値                                                                                                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 全角・半角         | `toFullWidth`、`toFullWidthAlphabet`、`toFullWidthNumber`、`toFullWidthSign`、`toFullWidthSpace`、`toFullWidthKana`、`toHalfWidth` と、同様の `toHalfWidth*`                                 |
| ひらがな・カタカナ | `toHiragana`、`toKatakana`                                                                                                                                                                   |
| 清音               | `toHiraganaSeion`、`toHiraganaSeionFromDakuon`、`toHiraganaSeionFromSokuon`、`toHiraganaSeionFromYouon` と、同様の `toKatakanaSeion*`                                                        |
| 削除               | `removeChouon`、`removeLineBreaks`、`removeSpaces`、`removeWhitespace`                                                                                                                       |
| ケース             | `toCamelCase`、`toDotCase`、`toFlatCase`、`toKebabCase`、`toLowerCase`、`toPascalCase`、`toScreamingSnakeCase`、`toSentenceCase`、`toSnakeCase`、`toTitleCase`、`toTrainCase`、`toUpperCase` |
| Unicode 正規化     | `toNfc`、`toNfd`、`toNfkc`、`toNfkd`                                                                                                                                                         |

| オプション       | 型        | 説明                                                                                                                                                 |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `composeTables?` | `boolean` | `true` の場合、変換テーブルを使う変換が続く部分を1つのテーブルにまとめて変換する。処理は速くなるが、変換の組み合わせによっては結果が変わることがある |

### 定数

| 定数                 | 説明                                   |
| -------------------- | -------------------------------------- |
| `TransformationType` | `transformString` に指定する変換の種類 |

### 型

| 型                         | 説明                                                  |
| -------------------------- | ----------------------------------------------------- |
| `AmbiguousWidth`           | 幅が曖昧な文字の扱い。`'full'`、`'half'`、`'neither'` |
| `ConversionTable`          | `convertByTable` の変換テーブル `{ id, entries }`     |
| `IsFullWidthOptions`       | `isFullWidth` のオプション                            |
| `IsHalfWidthOptions`       | `IsFullWidthOptions` と同じ                           |
| `IsNormalizedEqualOptions` | `isNormalizedEqual` のオプション                      |
| `NormalizeStringOptions`   | `normalizeString` のオプション                        |
| `ToFullWidthOptions`       | `toFullWidth` のオプション                            |
| `ToHalfWidthOptions`       | `ToFullWidthOptions` と同じ                           |
| `ToKatakanaSeionOptions`   | `toKatakanaSeion` のオプション                        |
| `ToHiraganaSeionOptions`   | `ToKatakanaSeionOptions` と同じ                       |
| `TransformationType`       | `transformString` の変換の種類の値                    |
| `TransformStringOptions`   | `transformString` のオプション                        |

## ライセンス

MIT
