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

| 関数                                      | 説明                                                  |
| ----------------------------------------- | ----------------------------------------------------- |
| `convertByTable(str, tables)`             | 変換テーブルに従って文字列を変換する                  |
| `getShiftJisByteLength(str)`              | Shift_JIS で表した場合のバイト数を返す                |
| `isFullWidth(str, options?)`              | 全角の文字だけで構成されているか判定する              |
| `isHalfWidth(str, options?)`              | 半角の文字だけで構成されているか判定する              |
| `isNormalizedEqual(str1, str2, options?)` | 正規化してから2つの文字列が等しいか判定する           |
| `isShiftJisDoubleByte(str)`               | Shift_JIS の2バイト文字だけで構成されているか判定する |
| `isShiftJisSingleByte(str)`               | Shift_JIS の1バイト文字だけで構成されているか判定する |
| `normalizeString(str, options?)`          | 表記の揺れを無くし、比較できる形にする                |
| `removeChouon(str)`                       | 長音符（`ー`）を削除する                              |
| `removeLineBreaks(str)`                   | 改行を削除する                                        |
| `removeSpaces(str)`                       | 半角スペース・全角スペースを削除する                  |
| `removeWhitespace(str)`                   | 改行以外の空白文字を削除する                          |
| `toFullWidth(str, options?)`              | 半角の文字を全角にする                                |
| `toHalfWidth(str, options?)`              | 全角の文字を半角にする                                |
| `toHiragana(str)`                         | カタカナをひらがなにする                              |
| `toHiraganaSeion(str, options?)`          | ひらがなの濁音・半濁音・促音・拗音を清音にする        |
| `toKatakana(str)`                         | ひらがなをカタカナにする                              |
| `toKatakanaSeion(str, options?)`          | カタカナの濁音・半濁音・促音・拗音を清音にする        |
| `toNfc(data)` など                        | Unicode 正規化を行う                                  |
| `transformString(str, types, options?)`   | 複数の変換を順番に適用する                            |
| `unifyChouon(str, options?)`              | 長音の代わりに使われた記号を長音符にそろえる          |
| `unifyDoubleQuotes(str, options?)`        | 二重引用符の種類をそろえる                            |
| `unifyHyphens(str, options?)`             | ハイフンの代わりに使われた記号をハイフンにそろえる    |
| `unifyLineBreaks(str, options?)`          | 改行の種類をそろえる                                  |
| `unifyMiddleDots(str, options?)`          | 中黒の種類をそろえる                                  |
| `unifySingleQuotes(str, options?)`        | 一重引用符の種類をそろえる                            |
| `unifySpaces(str, options?)`              | スペースの種類をそろえる                              |
| `unifyTildes(str, options?)`              | 波線の種類をそろえる                                  |

### `convertByTable`

```ts
convertByTable(str: string, tables: ConversionTable | (ConversionTable | false | null | undefined)[]): string
```

変換テーブルに従って文字列を変換します。複数のテーブルを指定した場合は1つにまとめて変換します。配列の中の `false`・`null`・`undefined` は無視するので、`[useKana && TO_HIRAGANA]` のように条件付きでテーブルを並べられます。同じ変換前の文字列が複数のテーブルにある場合は、後のテーブルが優先されます。まとめたテーブルと変換の処理は、テーブルのオブジェクトと順番の組み合わせごとにキャッシュします。呼び出すたびにテーブルを作るとキャッシュが効かないため、テーブルは定数として定義して使い回します。

```ts
const MY_TABLE: ConversionTable = {
  entries: [
    ['a', 'A'],
    ['b', 'B'],
  ],
};

convertByTable('abc', MY_TABLE); // 'ABc'
```

### `getShiftJisByteLength`

```ts
getShiftJisByteLength(str: string): number | null
```

文字列を Shift_JIS で表した場合のバイト数を返します。Shift_JIS は WHATWG Encoding Standard の定義（Windows-31J 相当）に従い、ブラウザーが Shift_JIS のフォームを送信する際の変換と同じ範囲になります。改行などの制御文字は1バイトとして数えます。`¥`・`‾` は1バイト、マイナス記号（`−` U+2212）は2バイトとして数えます。これらはエンコーダーがそれぞれ `\`・`~`・`－`（U+FF0D）のバイト列で表すため、受け取った側でデコードすると別の文字になります。Shift_JIS で表せない文字（ユーザー定義領域の外字を含む）がある場合は `null` を返します。空文字の場合は `0` を返します。

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
isNormalizedEqual(str1: string, str2: string, options?: IsNormalizedEqualOptions): boolean
```

2つの文字列を `normalizeString` で正規化してから、等しいか判定します。正規化の方法は `normalizeString` のオプションで指定します（何も指定しない場合は正規化しません）。

```ts
isNormalizedEqual('ＡＢＣ', 'abc', { ignoreWidth: true, ignoreCase: true }); // true
```

| オプション     | 型                       | 説明                                 |
| -------------- | ------------------------ | ------------------------------------ |
| `rawFirst?`    | `boolean`                | `true` の場合、`str1` を正規化しない |
| `rawSecond?`   | `boolean`                | `true` の場合、`str2` を正規化しない |
| `ignore*` など | `NormalizeStringOptions` | `normalizeString` のオプション       |

### `isShiftJisDoubleByte`

```ts
isShiftJisDoubleByte(str: string): boolean
```

文字列が Shift_JIS の2バイト文字（JIS X 0208 の文字と、`①` などの Windows-31J の拡張文字）だけで構成されているか判定します。Shift_JIS の定義は `getShiftJisByteLength` と同じです。波ダッシュ（`〜` U+301C）は Windows-31J では表せないため、含まれる場合は `false` になります。マイナス記号（`−` U+2212）は全角のハイフンマイナス（`－` U+FF0D）のバイト列で表せるため、2バイト文字として扱います。空文字の場合は `false` を返します。

### `isShiftJisSingleByte`

```ts
isShiftJisSingleByte(str: string): boolean
```

文字列が Shift_JIS の1バイト文字（ASCII の表示可能な文字、半角カタカナ、`¥`、`‾`）だけで構成されているか判定します。制御文字は含みません。空文字の場合は `false` を返します。

### `normalizeString`

```ts
normalizeString(str: string, options?: NormalizeStringOptions): string
```

全角・半角や大文字・小文字などの表記の揺れを無くし、検索や比較に使える形にします。どの違いを無くすかはオプションで指定します（何も指定しない場合は変換しません）。

かなを扱うオプション（`ignoreKana`・`ignoreDakuon`・`ignoreSokuon`・`ignoreYouon`・`ignoreChouon`）は全角のカナが対象です。半角カタカナも対象にする場合は、`ignoreWidth` か `ignoreCompatibility` を一緒に指定します。

```ts
normalizeString('ＡＢＣ', { ignoreWidth: true, ignoreCase: true }); // 'abc'
normalizeString('ガッコウ', {
  ignoreKana: true,
  ignoreDakuon: true,
  ignoreSokuon: true,
}); // 'かつこう'
normalizeString('㈱ｶﾞ', { ignoreCompatibility: true }); // '(株)ガ'
```

| オプション                | 型        | 説明                                                                                                                       |
| ------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `ignoreCompatibility?`    | `boolean` | 互換文字の違いを無視する（NFKC で正規化する）。指定した場合は `ignoreComposition`・`ignoreWidth` は不要                    |
| `ignoreComposition?`      | `boolean` | 合成文字と分解された文字の違いを無視する（NFC で正規化する）                                                               |
| `ignoreWidth?`            | `boolean` | 全角・半角の違いを無視する（半角にそろえる。`ignoreKana` と組み合わせた場合、半角カナは全角にそろえてからひらがなにする）  |
| `ignoreCase?`             | `boolean` | 英字の大文字・小文字の違いを無視する（小文字にそろえる）                                                                   |
| `ignoreKana?`             | `boolean` | ひらがな・カタカナの違いを無視する（ひらがなにそろえる）                                                                   |
| `ignoreDakuon?`           | `boolean` | 濁音（`ば`）・半濁音（`ぱ`）と清音（`は`）の違いを無視する。単独の濁点・半濁点（`゛`、`ﾞ`、結合用の濁点など）は除去する    |
| `ignoreSokuon?`           | `boolean` | 促音（`っ`）と清音（`つ`）の違いを無視する                                                                                 |
| `ignoreYouon?`            | `boolean` | 拗音（`ゃ`）と清音（`や`）の違いを無視する                                                                                 |
| `ignoreChouonVariant?`    | `boolean` | 長音の表記の違いを無視する（かなの直後にある、長音の代わりに使われた記号を `ー` にそろえる。`unifyChouon` を参照）         |
| `ignoreHyphenVariant?`    | `boolean` | ハイフンの表記の違いを無視する（かなの直後にない、ハイフンの代わりに使われた記号を `-` にそろえる。`unifyHyphens` を参照） |
| `ignoreSpaceVariant?`     | `boolean` | スペースの種類の違いを無視する（半角スペースにそろえる。`unifySpaces` を参照）                                             |
| `ignoreTildeVariant?`     | `boolean` | 波線の種類の違いを無視する（`～` にそろえる。`unifyTildes` を参照）                                                        |
| `ignoreMiddleDotVariant?` | `boolean` | 中黒の種類の違いを無視する（`・` にそろえる。`unifyMiddleDots` を参照）                                                    |
| `ignoreChouon?`           | `boolean` | 長音符（`ー`）を無視する                                                                                                   |
| `ignoreLineBreak?`        | `boolean` | 改行（CR、LF、Unicode の行区切り・段落区切り）を無視する                                                                   |
| `ignoreSpace?`            | `boolean` | 改行以外の空白文字（半角・全角スペース、タブ、ノーブレークスペースなど）を無視する                                         |

### `removeChouon`

```ts
removeChouon(str: string): string
```

長音符（`ー`）を削除します。半角の長音符（`ｰ`）は対象外です。半角も削除する場合は、先に `toFullWidth` で全角にします。

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

半角の英字・数字・記号・スペース・カナを全角にします。カナは半角カナ全体（カタカナと、`｡`・`｢`・`｣`・`､`・`･`・`ｰ`・`ﾞ`・`ﾟ`）が対象です。`ﾜﾞ`・`ｦﾞ` は合成済みの文字（`ヷ`・`ヺ`）にせず、`ワ゛`・`ヲ゛` にします。

```ts
toFullWidth('abc 123 ｱｲｳ'); // 'ａｂｃ　１２３　アイウ'
toFullWidth('abc 123', { keepNumber: true }); // 'ａｂｃ　123'
```

| オプション      | 型        | 説明                                                                          |
| --------------- | --------- | ----------------------------------------------------------------------------- |
| `keepAlphabet?` | `boolean` | `true` の場合、英字を変換せずに残す                                           |
| `keepNumber?`   | `boolean` | `true` の場合、数字を変換せずに残す                                           |
| `keepSymbol?`   | `boolean` | `true` の場合、記号（句読点・かぎ括弧・中黒を除く）を変換せずに残す           |
| `keepSpace?`    | `boolean` | `true` の場合、スペースを変換せずに残す                                       |
| `keepKana?`     | `boolean` | `true` の場合、カナ（カタカナと、句読点・かぎ括弧・中黒など）を変換せずに残す |

### `toHalfWidth`

```ts
toHalfWidth(str: string, options?: ToHalfWidthOptions): string
```

全角の英字・数字・記号・スペース・カナを半角にします。対象の文字とオプションは `toFullWidth` と同じです。半角の無い文字（`ヰ`・`ヵ`・`ヷ` など）はそのまま残します。

### `toHiragana` / `toKatakana`

```ts
toHiragana(str: string): string
toKatakana(str: string): string
```

カタカナをひらがなに（`toHiragana`）、ひらがなをカタカナに（`toKatakana`）します。全角のカナが対象です。半角カタカナも変換する場合は、先に `toFullWidth` で全角にします。`ヵ`・`ヶ`（「3ヶ月」のように助数詞として使われることが多いため）と、対応するひらがなの無い `ヷ`・`ヸ`・`ヹ`・`ヺ` は変換しません。

### `toHiraganaSeion` / `toKatakanaSeion`

```ts
toHiraganaSeion(str: string, options?: ToHiraganaSeionOptions): string
toKatakanaSeion(str: string, options?: ToKatakanaSeionOptions): string
```

ひらがな（`toHiraganaSeion`）・カタカナ（`toKatakanaSeion`）の濁音・半濁音・促音・拗音を清音にします。濁音の踊り字（`ゞ`・`ヾ`）も清音の踊り字にします。全角のカナが対象で、半角カタカナと `ヷ`・`ヸ`・`ヹ`・`ヺ` は変換しません。

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
| 全角・半角         | `toFullWidth`、`toFullWidthAlphabet`、`toFullWidthNumber`、`toFullWidthSymbol`、`toFullWidthSpace`、`toFullWidthKana`、`toHalfWidth` と、同様の `toHalfWidth*`                               |
| ひらがな・カタカナ | `toHiragana`、`toKatakana`                                                                                                                                                                   |
| 清音               | `toHiraganaSeion`、`toHiraganaSeionFromDakuon`、`toHiraganaSeionFromSokuon`、`toHiraganaSeionFromYouon` と、同様の `toKatakanaSeion*`                                                        |
| 統一               | `unifyChouon`、`unifyHyphens`、`unifySpaces`、`unifyLineBreaks`、`unifyTildes`、`unifyMiddleDots`、`unifyDoubleQuotes`、`unifySingleQuotes`                                                  |
| 削除               | `removeChouon`、`removeLineBreaks`、`removeSpaces`、`removeWhitespace`                                                                                                                       |
| ケース             | `toCamelCase`、`toDotCase`、`toFlatCase`、`toKebabCase`、`toLowerCase`、`toPascalCase`、`toScreamingSnakeCase`、`toSentenceCase`、`toSnakeCase`、`toTitleCase`、`toTrainCase`、`toUpperCase` |
| Unicode 正規化     | `toNfc`、`toNfd`、`toNfkc`、`toNfkd`                                                                                                                                                         |

| オプション       | 型        | 説明                                                                                                                                                 |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `composeTables?` | `boolean` | `true` の場合、変換テーブルを使う変換が続く部分を1つのテーブルにまとめて変換する。処理は速くなるが、変換の組み合わせによっては結果が変わることがある |

### `unifyChouon` / `unifyHyphens`

```ts
unifyChouon(str: string, options?: UnifyChouonOptions): string
unifyHyphens(str: string, options?: UnifyHyphensOptions): string
```

長音とハイフンは同じような横線の記号で書かれることが多いため、直前の文字で見分けてそろえます。かな（全角のひらがな・カタカナと半角カタカナ。濁点・半濁点と踊り字を含む）の直後にある横線は長音、それ以外の横線はハイフンとみなします。2つの関数はちょうど裏表の関係で、どちらを先に適用しても、両方を適用しても結果は同じです。

- `unifyChouon` は、かなの直後にある `CHOUON_VARIANTS` の文字（長音符と、`―`、`－`、`-`、`〜` などの横線・波線）を長音符にそろえます。`to` を指定しない場合は、直前のかなの幅に合わせて、全角のかなの後は `ー`、半角カタカナの後は `ｰ` にします
- `unifyHyphens` は、かなの直後にない `HYPHEN_VARIANTS` の文字（ハイフン・ダッシュ・マイナスの記号と、`123ー4567` のようにハイフンの代わりに使われた長音符）を `-` にそろえます。波線と罫線はハイフンにしません

漢字の `一` や、ハングルなどの文字は対象外です。記号が続く場合は、1文字ずつ置き換えます。

```ts
unifyChouon('サ―バ ｻ―ﾊﾞ すご〜い 1－2'); // 'サーバ ｻｰﾊﾞ すごーい 1－2'
unifyHyphens('サ―バ 123ー4567 東京―大阪'); // 'サ―バ 123-4567 東京-大阪'
unifyChouon('サーバ―', { to: '-' }); // 'サ-バ-'
unifyHyphens('サーバ 1－2', { always: true }); // 'サ-バ 1-2'
```

| オプション | 型                                | 説明                                                                                                                                                            |
| ---------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `to?`      | `ChouonVariant` / `HyphenVariant` | そろえる先の文字。長音符・ハイフンそのものも対象なので、指定した文字にそろう。デフォルトは、`unifyChouon` は直前のかなに合わせた長音符、`unifyHyphens` は `'-'` |
| `always?`  | `boolean`                         | `true` の場合、かなの直後かどうかに関係なく、すべての対象の文字をそろえる（`unifyChouon` で `to` を指定しない場合は `ー`）。デフォルトは `false`                |

### `unifySpaces` など

```ts
unifySpaces(str: string, options?: UnifySpacesOptions): string
unifyLineBreaks(str: string, options?: UnifyLineBreaksOptions): string
unifyTildes(str: string, options?: UnifyTildesOptions): string
unifyMiddleDots(str: string, options?: UnifyMiddleDotsOptions): string
unifyDoubleQuotes(str: string, options?: UnifyDoubleQuotesOptions): string
unifySingleQuotes(str: string, options?: UnifySingleQuotesOptions): string
```

同じ種類の別の文字を、1つの文字にそろえます。前後の文字は見ません。対象の文字は、関数ごとの定数で確認できます。

```ts
unifySpaces('a\u3000b\u00a0c'); // 'a b c'
unifySpaces('a b', { to: '\u3000' }); // 'a　b'
unifyLineBreaks('a\r\nb\rc', { to: '\r\n' }); // 'a\r\nb\r\nc'
unifyTildes('1〜3'); // '1～3'
unifyDoubleQuotes('“a”'); // '"a"'
```

| 関数                | 対象の文字                                                                                                             | デフォルトの統一先 | 補足                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| `unifySpaces`       | `SPACE_VARIANTS`: 半角・全角スペース、ノーブレークスペース、各種の幅のスペース                                         | `' '`              | タブと改行は対象外。連続するスペースはまとめない                                                       |
| `unifyLineBreaks`   | `LINE_BREAK_VARIANTS`: CRLF、CR、LF、Unicode の行区切り・段落区切り                                                    | `'\n'`             | CRLF は1つの改行として扱う                                                                             |
| `unifyTildes`       | `TILDE_VARIANTS`: 全角チルダ（`～` U+FF5E）、波ダッシュ（`〜` U+301C）、半角チルダ、`〰`、`∼`                          | `'～'`             | 既定値の `～` は Windows-31J でも表せる。かなの直後の波線を長音にする場合は、先に `unifyChouon` を使う |
| `unifyMiddleDots`   | `MIDDLE_DOT_VARIANTS`: 中黒、半角の中黒、欧文の中点（`·` `‧` `⋅`）                                                     | `'・'`             |                                                                                                        |
| `unifyDoubleQuotes` | `DOUBLE_QUOTE_VARIANTS`: 半角・全角の二重引用符、曲がった引用符（`“` `”` `„` `‟`）、ダブルミニュート（`〝` `〟` `〞`） | `'"'`              | 開きと閉じを区別する引用符にはそろえられないため、統一先は向きの無い引用符になる                       |
| `unifySingleQuotes` | `SINGLE_QUOTE_VARIANTS`: 半角・全角の一重引用符、曲がった引用符（`‘` `’` `‚` `‛`）                                     | `"'"`              | 同上                                                                                                   |

| オプション | 型                  | 説明                                                   |
| ---------- | ------------------- | ------------------------------------------------------ |
| `to?`      | `SpaceVariant` など | そろえる先の文字。その関数の定数に含まれる文字から選ぶ |

### 定数

| 定数                    | 説明                                    |
| ----------------------- | --------------------------------------- |
| `TransformationType`    | `transformString` に指定する変換の種類  |
| `CHOUON_VARIANTS`       | `unifyChouon` が長音として扱う文字      |
| `HYPHEN_VARIANTS`       | `unifyHyphens` がハイフンとして扱う文字 |
| `SPACE_VARIANTS`        | `unifySpaces` が統一する文字            |
| `LINE_BREAK_VARIANTS`   | `unifyLineBreaks` が統一する文字        |
| `TILDE_VARIANTS`        | `unifyTildes` が統一する文字            |
| `MIDDLE_DOT_VARIANTS`   | `unifyMiddleDots` が統一する文字        |
| `DOUBLE_QUOTE_VARIANTS` | `unifyDoubleQuotes` が統一する文字      |
| `SINGLE_QUOTE_VARIANTS` | `unifySingleQuotes` が統一する文字      |

### 型

| 型                         | 説明                                                  |
| -------------------------- | ----------------------------------------------------- |
| `AmbiguousWidth`           | 幅が曖昧な文字の扱い。`'full'`、`'half'`、`'neither'` |
| `ChouonVariant`            | `CHOUON_VARIANTS` の文字                              |
| `HyphenVariant`            | `HYPHEN_VARIANTS` の文字                              |
| `SpaceVariant`             | `SPACE_VARIANTS` の文字                               |
| `LineBreakVariant`         | `LINE_BREAK_VARIANTS` の文字                          |
| `TildeVariant`             | `TILDE_VARIANTS` の文字                               |
| `MiddleDotVariant`         | `MIDDLE_DOT_VARIANTS` の文字                          |
| `DoubleQuoteVariant`       | `DOUBLE_QUOTE_VARIANTS` の文字                        |
| `SingleQuoteVariant`       | `SINGLE_QUOTE_VARIANTS` の文字                        |
| `ConversionTable`          | `convertByTable` の変換テーブル `{ entries }`         |
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
| `UnifyChouonOptions`       | `unifyChouon` のオプション                            |
| `UnifyHyphensOptions`      | `unifyHyphens` のオプション                           |
| `UnifySpacesOptions`       | `unifySpaces` のオプション                            |
| `UnifyLineBreaksOptions`   | `unifyLineBreaks` のオプション                        |
| `UnifyTildesOptions`       | `unifyTildes` のオプション                            |
| `UnifyMiddleDotsOptions`   | `unifyMiddleDots` のオプション                        |
| `UnifyDoubleQuotesOptions` | `unifyDoubleQuotes` のオプション                      |
| `UnifySingleQuotesOptions` | `unifySingleQuotes` のオプション                      |

## 変換表の変更について

変換表に対応する文字を加えたり、誤りを直したりすることがあります。その場合は変換の結果が変わるため、1.0.0 以降は minor バージョンで公開し、CHANGELOG に記載します。既定の動作を大きく変える追加（よく使われる文字の扱いを変えるものなど）は、オプションで有効にする形にします。

変換の結果を検索用のキーとしてデータベースに保存するなど、永続化して使う場合は、バージョンを上げたときに保存済みの値を作り直す必要がないか確認してください。

## ライセンス

MIT
