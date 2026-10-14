# @fringeworks/japanese-text

`@fringeworks/japanese-text` is a library some will find handy, for converting and checking Japanese text, such as kana, full-width and half-width characters, and Shift_JIS.

**[日本語のREADMEはこちら](./README.ja.md)**

## Installation

```bash
npm install @fringeworks/japanese-text
# or
pnpm add @fringeworks/japanese-text
```

## Usage

Functions, types, and constants can be imported by the same name from the root or from a per-function path. A per-function path also provides its function as the default export.

```ts
import { normalizeString } from '@fringeworks/japanese-text';
import normalizeString from '@fringeworks/japanese-text/normalizeString';
```

### Data Last

Functions with `dataLast` take every argument except the data first and return a function that receives the data. This is useful in pipelines and as a callback for methods such as `Array.prototype.map`. Functions that have `dataLast` show it alongside their signatures.

```ts
const fn = normalizeString.dataLast({ ignoreKana: true });
```

---

## API

| Function                                      | Description                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------- |
| `convertByTable(str, tables)`                 | Converts text according to conversion tables                              |
| `getShiftJisByteLength(str)`                  | Returns the byte length of a string in Shift_JIS                          |
| `isFullWidth(str, options?)`                  | Checks whether a string consists only of full-width characters            |
| `isHalfWidth(str, options?)`                  | Checks whether a string consists only of half-width characters            |
| `isNormalizedEqual(value1, value2, options?)` | Checks whether two strings are equal after normalization                  |
| `isShiftJisDoubleByte(str)`                   | Checks whether a string consists only of Shift_JIS double-byte characters |
| `isShiftJisSingleByte(str)`                   | Checks whether a string consists only of Shift_JIS single-byte characters |
| `normalizeString(value, options?)`            | Removes variations in notation to make strings comparable                 |
| `removeChouon(str)`                           | Removes the prolonged sound mark (`ー`)                                   |
| `removeLineBreaks(str)`                       | Removes line breaks                                                       |
| `removeSpaces(str)`                           | Removes half-width and full-width spaces                                  |
| `removeWhitespace(str)`                       | Removes whitespace other than line breaks                                 |
| `toFullWidth(str, options?)`                  | Converts half-width characters to full-width                              |
| `toHalfWidth(str, options?)`                  | Converts full-width characters to half-width                              |
| `toHiragana(str)`                             | Converts katakana to hiragana                                             |
| `toHiraganaSeion(str, options?)`              | Converts voiced, small, and geminate hiragana to their plain forms        |
| `toKatakana(str)`                             | Converts hiragana to katakana                                             |
| `toKatakanaSeion(str, options?)`              | Converts voiced, small, and geminate katakana to their plain forms        |
| `toNfc(data)`, ...                            | Applies Unicode normalization                                             |
| `transformString(str, types, options?)`       | Applies several conversions in order                                      |

### `convertByTable`

```ts
convertByTable(str: string, tables: ConversionTable | (ConversionTable | false | null | undefined)[]): string
```

Converts text according to conversion tables. Several tables are merged into one before conversion. `false`, `null` and `undefined` in the array are ignored, so tables can be listed conditionally, as in `[useKana && TO_HIRAGANA]`. Merged tables and converters are cached by `id`, so always use the same `entries` for the same `id`.

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

Returns the byte length of a string encoded in Shift_JIS. Shift_JIS follows the WHATWG Encoding Standard (equivalent to Windows-31J), which is the same conversion browsers use when submitting a form in Shift_JIS. Control characters such as line breaks count as one byte. Returns `null` when the string contains a character that Shift_JIS cannot represent (including user-defined characters). Returns `0` for an empty string, `null`, or `undefined`.

```ts
getShiftJisByteLength('aｱあ'); // 4
getShiftJisByteLength('𠮷'); // null
```

### `isFullWidth`

```ts
isFullWidth(str: string, options?: IsFullWidthOptions): boolean
```

Checks whether a string consists only of full-width characters. Characters whose Unicode East Asian Width (UAX #11) is W (Wide) or F (Fullwidth) are full-width, including emoji. Control characters such as line breaks and tabs, and characters with no full-width/half-width distinction such as Thai (N), are neither. Combining characters, zero-width joiners, and variation selectors are treated as part of the preceding character. Returns `false` for an empty string.

```ts
isFullWidth('あいう漢字ＡＢＣ'); // true
isFullWidth('あa'); // false
isFullWidth('①○'); // true
isFullWidth('①○', { ambiguousAs: 'half' }); // false
```

| Option         | Type             | Description                                                                                                                                                    |
| -------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ambiguousAs?` | `AmbiguousWidth` | How to treat characters of ambiguous width (East Asian Width A, such as `①`, `○`, `※`, `α`, and `é`): `'full'`, `'half'`, or `'neither'`. Defaults to `'full'` |

### `isHalfWidth`

```ts
isHalfWidth(str: string, options?: IsHalfWidthOptions): boolean
```

Checks whether a string consists only of half-width characters. Characters whose East Asian Width is Na (Narrow) or H (Halfwidth) are half-width. Everything else, including the options, works the same as `isFullWidth`. Because characters of ambiguous width are treated as full-width by default, a string containing `é` and the like returns `false`.

```ts
isHalfWidth('abc 123 ｱｲｳ'); // true
isHalfWidth('café'); // false
isHalfWidth('café', { ambiguousAs: 'half' }); // true
```

### `isNormalizedEqual`

```ts
isNormalizedEqual(value1: string, value2: string, options?: IsNormalizedEqualOptions): boolean
isNormalizedEqual.dataLast(value2: string, options?: IsNormalizedEqualOptions): (value1: string) => boolean
```

Normalizes two strings with `normalizeString` and checks whether they are equal. How to normalize is set with the options of `normalizeString` (nothing is normalized if none are given).

```ts
isNormalizedEqual('ＡＢＣ', 'abc', { ignoreWidth: true, ignoreCase: true }); // true
```

| Option         | Type                     | Description                           |
| -------------- | ------------------------ | ------------------------------------- |
| `rawFirst?`    | `boolean`                | If `true`, `value1` is not normalized |
| `rawSecond?`   | `boolean`                | If `true`, `value2` is not normalized |
| `ignore*`, ... | `NormalizeStringOptions` | Options of `normalizeString`          |

### `isShiftJisDoubleByte`

```ts
isShiftJisDoubleByte(str: string): boolean
```

Checks whether a string consists only of Shift_JIS double-byte characters (JIS X 0208 characters and Windows-31J extensions such as `①`). Shift_JIS is defined as in `getShiftJisByteLength`. The wave dash (`〜` U+301C) and the minus sign (`−` U+2212) cannot be represented in Windows-31J, so strings containing them return `false`. Returns `false` for an empty string.

### `isShiftJisSingleByte`

```ts
isShiftJisSingleByte(str: string): boolean
```

Checks whether a string consists only of Shift_JIS single-byte characters (printable ASCII, half-width katakana, `¥`, and `‾`). Control characters are not included. Returns `false` for an empty string.

### `normalizeString`

```ts
normalizeString(value: string, options?: NormalizeStringOptions): string
normalizeString.dataLast(options?: NormalizeStringOptions): (value: string) => string
```

Removes variations in notation, such as full-width and half-width forms or upper and lower case, so that strings can be searched and compared. The options choose which differences to remove (nothing is converted if none are given). When `value` is `null` or `undefined`, returns `nullValue` or `undefinedValue` if given, and `value` as is otherwise.

```ts
normalizeString('ＡＢＣ', { ignoreWidth: true, ignoreCase: true }); // 'abc'
normalizeString('ガッコウ', {
  ignoreKana: true,
  ignoreDakuon: true,
  ignoreSokuon: true,
}); // 'かつこう'
normalizeString('㈱ｶﾞ', { ignoreCompatibility: true }); // '(株)ガ'
```

| Option                 | Type      | Description                                                                                                                                                            |
| ---------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignoreCompatibility?` | `boolean` | Ignores differences between compatibility characters (NFKC normalization). Makes `ignoreComposition` and `ignoreWidth` unnecessary                                     |
| `ignoreComposition?`   | `boolean` | Ignores differences between composed and decomposed characters (NFC normalization)                                                                                     |
| `ignoreWidth?`         | `boolean` | Ignores full-width and half-width differences (converts to half-width; with `ignoreKana`, kana are converted to full-width and then to hiragana)                       |
| `ignoreCase?`          | `boolean` | Ignores upper and lower case (converts to lowercase)                                                                                                                   |
| `ignoreKana?`          | `boolean` | Ignores hiragana and katakana differences (converts to hiragana)                                                                                                       |
| `ignoreDakuon?`        | `boolean` | Ignores voiced (`ば`) and semi-voiced (`ぱ`) marks versus the plain form (`は`). Standalone voiced and semi-voiced marks (`゛`, `ﾞ`, combining marks, ...) are removed |
| `ignoreSokuon?`        | `boolean` | Ignores the small `っ` versus the plain `つ`                                                                                                                           |
| `ignoreYouon?`         | `boolean` | Ignores small kana (`ゃ`) versus the plain form (`や`)                                                                                                                 |
| `ignoreChouon?`        | `boolean` | Ignores the prolonged sound mark (`ー`)                                                                                                                                |
| `ignoreLineBreak?`     | `boolean` | Ignores line breaks (CR, LF, and the Unicode line and paragraph separators)                                                                                            |
| `ignoreSpace?`         | `boolean` | Ignores whitespace other than line breaks (half-width and full-width spaces, tabs, no-break spaces, ...)                                                               |
| `nullValue?`           | `string`  | The value returned when `value` is `null`                                                                                                                              |
| `undefinedValue?`      | `string`  | The value returned when `value` is `undefined`                                                                                                                         |

### `removeChouon`

```ts
removeChouon(str: string): string
```

Removes the prolonged sound mark (`ー`).

### `removeLineBreaks`

```ts
removeLineBreaks(str: string): string
```

Removes line breaks (CR, LF, CRLF, and the Unicode line separator U+2028 and paragraph separator U+2029).

### `removeSpaces`

```ts
removeSpaces(str: string): string
```

Removes half-width and full-width spaces. Use `removeWhitespace` to remove other whitespace such as tabs as well.

### `removeWhitespace`

```ts
removeWhitespace(str: string): string
```

Removes whitespace other than line breaks (half-width and full-width spaces, tabs, no-break spaces, spaces of various widths, and so on). Use `removeLineBreaks` to remove line breaks.

### `toFullWidth`

```ts
toFullWidth(str: string, options?: ToFullWidthOptions): string
toFullWidth.dataLast(options?: ToFullWidthOptions): (str: string) => string
```

Converts half-width letters, digits, symbols, spaces, and katakana to full-width.

```ts
toFullWidth('abc 123 ｱｲｳ'); // 'ａｂｃ　１２３　アイウ'
toFullWidth('abc 123', { keepNumber: true }); // 'ａｂｃ　123'
```

| Option          | Type      | Description                       |
| --------------- | --------- | --------------------------------- |
| `keepAlphabet?` | `boolean` | If `true`, letters are kept as is |
| `keepNumber?`   | `boolean` | If `true`, digits are kept as is  |
| `keepSign?`     | `boolean` | If `true`, symbols are kept as is |
| `keepSpace?`    | `boolean` | If `true`, spaces are kept as is  |
| `keepKana?`     | `boolean` | If `true`, katakana is kept as is |

### `toHalfWidth`

```ts
toHalfWidth(str: string, options?: ToHalfWidthOptions): string
```

Converts full-width letters, digits, symbols, spaces, and katakana to half-width. The options are the same as `toFullWidth`.

### `toHiragana` / `toKatakana`

```ts
toHiragana(str: string): string
toHiragana.dataLast(): (str: string) => string
toKatakana(str: string): string
```

Converts katakana to hiragana (`toHiragana`) or hiragana to katakana (`toKatakana`).

### `toHiraganaSeion` / `toKatakanaSeion`

```ts
toHiraganaSeion(str: string, options?: ToHiraganaSeionOptions): string
toKatakanaSeion(str: string, options?: ToKatakanaSeionOptions): string
```

Converts voiced and semi-voiced kana, the small `っ`, and other small kana in hiragana (`toHiraganaSeion`) or katakana (`toKatakanaSeion`) to their plain forms.

```ts
toHiraganaSeion('がっこう'); // 'かつこう'
toKatakanaSeion('ガッコウ', { keepSokuon: true }); // 'カッコウ'
```

| Option        | Type      | Description                                                             |
| ------------- | --------- | ----------------------------------------------------------------------- |
| `keepDakuon?` | `boolean` | If `true`, voiced and semi-voiced kana (`が`, `ぱ`, ...) are kept as is |
| `keepSokuon?` | `boolean` | If `true`, the small `っ` is kept as is                                 |
| `keepYouon?`  | `boolean` | If `true`, other small kana (`ゃ`, `ぁ`, ...) are kept as is            |

### Unicode normalization

```ts
toNfc(data: string): string
toNfd(data: string): string
toNfkc(data: string): string
toNfkd(data: string): string
// each also has dataLast(): (data: string) => string
```

Applies Unicode normalization with `String.prototype.normalize`.

| Function | Form | Example                                      |
| -------- | ---- | -------------------------------------------- |
| `toNfc`  | NFC  | `か` + combining voiced mark → `が`          |
| `toNfd`  | NFD  | `が` → `か` + combining voiced mark          |
| `toNfkc` | NFKC | `１２３` → `123`, `ｶﾞ` → `ガ`, `㈱` → `(株)` |
| `toNfkd` | NFKD | `ｶﾞ` → `カ` + combining voiced mark          |

### `transformString`

```ts
transformString(str: string, types: TransformationType[], options?: TransformStringOptions): string
transformString.dataLast(types: TransformationType[], options?: TransformStringOptions): (str: string) => string
```

Applies the conversions in `types` in the given order.

```ts
transformString('ﾊﾛｰ', ['toFullWidth', 'toHiragana']); // 'はろー'
transformString('hello world', [TransformationType.toPascalCase]); // 'HelloWorld'
```

The available conversions (values of `TransformationType`) are:

| Kind                    | Values                                                                                                                                                                                       |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full-width / half-width | `toFullWidth`, `toFullWidthAlphabet`, `toFullWidthNumber`, `toFullWidthSign`, `toFullWidthSpace`, `toFullWidthKana`, `toHalfWidth`, and the matching `toHalfWidth*`                          |
| Hiragana / katakana     | `toHiragana`, `toKatakana`                                                                                                                                                                   |
| Plain forms             | `toHiraganaSeion`, `toHiraganaSeionFromDakuon`, `toHiraganaSeionFromSokuon`, `toHiraganaSeionFromYouon`, and the matching `toKatakanaSeion*`                                                 |
| Removal                 | `removeChouon`, `removeLineBreaks`, `removeSpaces`, `removeWhitespace`                                                                                                                       |
| Case                    | `toCamelCase`, `toDotCase`, `toFlatCase`, `toKebabCase`, `toLowerCase`, `toPascalCase`, `toScreamingSnakeCase`, `toSentenceCase`, `toSnakeCase`, `toTitleCase`, `toTrainCase`, `toUpperCase` |
| Unicode normalization   | `toNfc`, `toNfd`, `toNfkc`, `toNfkd`                                                                                                                                                         |

| Option           | Type      | Description                                                                                                                                           |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `composeTables?` | `boolean` | If `true`, consecutive table-based conversions are merged into one table. This is faster, but some combinations of conversions give different results |

### Constants

| Constant             | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `TransformationType` | The conversions that can be passed to `transformString` |

### Types

| Type                       | Description                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| `AmbiguousWidth`           | How to treat characters of ambiguous width: `'full'`, `'half'`, `'neither'` |
| `ConversionTable`          | A conversion table for `convertByTable` `{ id, entries }`                   |
| `IsFullWidthOptions`       | Options for `isFullWidth`                                                   |
| `IsHalfWidthOptions`       | Same as `IsFullWidthOptions`                                                |
| `IsNormalizedEqualOptions` | Options for `isNormalizedEqual`                                             |
| `NormalizeStringOptions`   | Options for `normalizeString`                                               |
| `ToFullWidthOptions`       | Options for `toFullWidth`                                                   |
| `ToHalfWidthOptions`       | Same as `ToFullWidthOptions`                                                |
| `ToKatakanaSeionOptions`   | Options for `toKatakanaSeion`                                               |
| `ToHiraganaSeionOptions`   | Same as `ToKatakanaSeionOptions`                                            |
| `TransformationType`       | The conversion values for `transformString`                                 |
| `TransformStringOptions`   | Options for `transformString`                                               |

## License

MIT
