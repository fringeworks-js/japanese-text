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
| `getShiftJisByteLength(str)`                  | Returns the byte length of a string in Shift_JIS                          |
| `isFullWidth(str, options?)`                  | Checks whether a string consists only of full-width characters            |
| `isHalfWidth(str, options?)`                  | Checks whether a string consists only of half-width characters            |
| `isNormalizedEqual(value1, value2, options?)` | Checks whether two strings are equal after normalization                  |
| `isShiftJisDoubleByte(str)`                   | Checks whether a string consists only of Shift_JIS double-byte characters |
| `isShiftJisSingleByte(str)`                   | Checks whether a string consists only of Shift_JIS single-byte characters |
| `normalizeString(value, options?)`            | Removes variations in notation to make strings comparable                 |
| `retype(str, definitions)`                    | Replaces text according to replacement map definitions                    |
| `retypeToFullWidth(str, options?)`            | Converts half-width characters to full-width                              |
| `retypeToHalfWidth(str, options?)`            | Converts full-width characters to half-width                              |
| `retypeToHiragana(str)`                       | Converts katakana to hiragana                                             |
| `retypeToHiraganaSeion(str, options?)`        | Converts voiced, small, and geminate hiragana to their plain forms        |
| `retypeToKatakana(str)`                       | Converts hiragana to katakana                                             |
| `retypeToKatakanaSeion(str, options?)`        | Converts voiced, small, and geminate katakana to their plain forms        |
| `retypeToNfc(data)`, ...                      | Applies Unicode normalization                                             |
| `retypeToNoChouon(str)`                       | Removes the prolonged sound mark (`ー`)                                   |
| `retypeToNoLineFeed(str)`                     | Removes line breaks                                                       |
| `retypeToNoSpace(str)`                        | Removes half-width and full-width spaces                                  |
| `retypeToNoWhitespace(str)`                   | Removes whitespace other than line breaks                                 |
| `transformString(str, types, options?)`       | Applies several conversions in order                                      |

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

| Option                 | Type      | Description                                                                                                                        |
| ---------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `ignoreCompatibility?` | `boolean` | Ignores differences between compatibility characters (NFKC normalization). Makes `ignoreComposition` and `ignoreWidth` unnecessary |
| `ignoreComposition?`   | `boolean` | Ignores differences between composed and decomposed characters (NFC normalization)                                                 |
| `ignoreWidth?`         | `boolean` | Ignores full-width and half-width differences (converts to half-width)                                                             |
| `ignoreCase?`          | `boolean` | Ignores upper and lower case (converts to lowercase)                                                                               |
| `ignoreKana?`          | `boolean` | Ignores hiragana and katakana differences (converts to hiragana)                                                                   |
| `ignoreDakuon?`        | `boolean` | Ignores voiced (`ば`) and semi-voiced (`ぱ`) marks versus the plain form (`は`)                                                    |
| `ignoreSokuon?`        | `boolean` | Ignores the small `っ` versus the plain `つ`                                                                                       |
| `ignoreYouon?`         | `boolean` | Ignores small kana (`ゃ`) versus the plain form (`や`)                                                                             |
| `ignoreChouon?`        | `boolean` | Ignores the prolonged sound mark (`ー`)                                                                                            |
| `ignoreLineFeed?`      | `boolean` | Ignores line breaks (CR, LF, and the Unicode line and paragraph separators)                                                        |
| `ignoreSpace?`         | `boolean` | Ignores whitespace other than line breaks (half-width and full-width spaces, tabs, no-break spaces, ...)                           |
| `nullValue?`           | `string`  | The value returned when `value` is `null`                                                                                          |
| `undefinedValue?`      | `string`  | The value returned when `value` is `undefined`                                                                                     |

### `retype`

```ts
retype(str: string, definitions: ReplacementMapDefinition | ReplacementMapDefinition[]): string
```

Replaces text according to replacement map definitions. Several definitions are merged into one map. Merged maps and replacers are cached by `id`, so always use the same map for the same `id`.

```ts
retype('abc', {
  id: 'myMap',
  map: [
    ['a', 'A'],
    ['b', 'B'],
  ],
}); // 'ABc'
```

### `retypeToFullWidth`

```ts
retypeToFullWidth(str: string, options?: RetypeToFullWidthOptions): string
retypeToFullWidth.dataLast(options?: RetypeToFullWidthOptions): (str: string) => string
```

Converts half-width letters, digits, symbols, spaces, and katakana to full-width.

```ts
retypeToFullWidth('abc 123 ｱｲｳ'); // 'ａｂｃ　１２３　アイウ'
retypeToFullWidth('abc 123', { disableNumber: true }); // 'ａｂｃ　123'
```

| Option             | Type      | Description                          |
| ------------------ | --------- | ------------------------------------ |
| `disableAlphabet?` | `boolean` | If `true`, letters are not converted |
| `disableNumber?`   | `boolean` | If `true`, digits are not converted  |
| `disableSign?`     | `boolean` | If `true`, symbols are not converted |
| `disableSpace?`    | `boolean` | If `true`, spaces are not converted  |
| `disableKana?`     | `boolean` | If `true`, katakana is not converted |

### `retypeToHalfWidth`

```ts
retypeToHalfWidth(str: string, options?: RetypeToHalfWidthOptions): string
```

Converts full-width letters, digits, symbols, spaces, and katakana to half-width. The options are the same as `retypeToFullWidth`.

### `retypeToHiragana` / `retypeToKatakana`

```ts
retypeToHiragana(str: string): string
retypeToHiragana.dataLast(): (str: string) => string
retypeToKatakana(str: string): string
```

Converts katakana to hiragana (`retypeToHiragana`) or hiragana to katakana (`retypeToKatakana`).

### `retypeToHiraganaSeion` / `retypeToKatakanaSeion`

```ts
retypeToHiraganaSeion(str: string, options?: RetypeToHiraganaSeionOptions): string
retypeToKatakanaSeion(str: string, options?: RetypeToKatakanaSeionOptions): string
```

Converts voiced and semi-voiced kana, the small `っ`, and other small kana in hiragana (`retypeToHiraganaSeion`) or katakana (`retypeToKatakanaSeion`) to their plain forms.

```ts
retypeToHiraganaSeion('がっこう'); // 'かつこう'
retypeToKatakanaSeion('ガッコウ', { disableSokuon: true }); // 'カッコウ'
```

| Option           | Type      | Description                                                                |
| ---------------- | --------- | -------------------------------------------------------------------------- |
| `disableDakuon?` | `boolean` | If `true`, voiced and semi-voiced kana (`が`, `ぱ`, ...) are not converted |
| `disableSokuon?` | `boolean` | If `true`, the small `っ` is not converted                                 |
| `disableYouon?`  | `boolean` | If `true`, other small kana (`ゃ`, `ぁ`, ...) are not converted            |

### Unicode normalization

```ts
retypeToNfc(data: string): string
retypeToNfd(data: string): string
retypeToNfkc(data: string): string
retypeToNfkd(data: string): string
// each also has dataLast(): (data: string) => string
```

Applies Unicode normalization with `String.prototype.normalize`.

| Function       | Form | Example                                      |
| -------------- | ---- | -------------------------------------------- |
| `retypeToNfc`  | NFC  | `か` + combining voiced mark → `が`          |
| `retypeToNfd`  | NFD  | `が` → `か` + combining voiced mark          |
| `retypeToNfkc` | NFKC | `１２３` → `123`, `ｶﾞ` → `ガ`, `㈱` → `(株)` |
| `retypeToNfkd` | NFKD | `ｶﾞ` → `カ` + combining voiced mark          |

### `retypeToNoChouon`

```ts
retypeToNoChouon(str: string): string
```

Removes the prolonged sound mark (`ー`).

### `retypeToNoLineFeed`

```ts
retypeToNoLineFeed(str: string): string
```

Removes line breaks (CR, LF, CRLF, and the Unicode line separator U+2028 and paragraph separator U+2029).

### `retypeToNoSpace`

```ts
retypeToNoSpace(str: string): string
```

Removes half-width and full-width spaces. Use `retypeToNoWhitespace` to remove other whitespace such as tabs as well.

### `retypeToNoWhitespace`

```ts
retypeToNoWhitespace(str: string): string
```

Removes whitespace other than line breaks (half-width and full-width spaces, tabs, no-break spaces, spaces of various widths, and so on). Use `retypeToNoLineFeed` to remove line breaks.

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

| Kind                    | Values                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full-width / half-width | `toFullWidth`, `toFullWidthAlphabet`, `toFullWidthNumber`, `toFullWidthSign`, `toFullWidthSpace`, `toFullWidthKana`, `toHalfWidth`, and the matching `toHalfWidth*` |
| Hiragana / katakana     | `toHiragana`, `toKatakana`                                                                                                                                          |
| Plain forms             | `toHiraganaSeion`, `toHiraganaSeionFromDakuon`, `toHiraganaSeionFromSokuon`, `toHiraganaSeionFromYouon`, and the matching `toKatakanaSeion*`                        |
| Removal                 | `toNoChouon`, `toNoLineFeed`, `toNoSpace`, `toNoWhitespace`                                                                                                         |
| Case                    | `toCamelCase`, `toKebabCase`, `toLowerCase`, `toPascalCase`, `toScreamingSnakeCase`, `toSnakeCase`, `toTitleCase`, `toUpperCase`                                    |
| Unicode normalization   | `toNfc`, `toNfd`, `toNfkc`, `toNfkd`                                                                                                                                |

| Option        | Type      | Description                                                                                                                                       |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `composeMap?` | `boolean` | If `true`, consecutive map-based conversions are merged into one map. This is faster, but some combinations of conversions give different results |

### Constants

| Constant             | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `TransformationType` | The conversions that can be passed to `transformString` |

### Types

| Type                           | Description                                                                 |
| ------------------------------ | --------------------------------------------------------------------------- |
| `AmbiguousWidth`               | How to treat characters of ambiguous width: `'full'`, `'half'`, `'neither'` |
| `IsFullWidthOptions`           | Options for `isFullWidth`                                                   |
| `IsHalfWidthOptions`           | Same as `IsFullWidthOptions`                                                |
| `IsNormalizedEqualOptions`     | Options for `isNormalizedEqual`                                             |
| `NormalizeStringOptions`       | Options for `normalizeString`                                               |
| `ReplacementMapDefinition`     | A replacement map definition for `retype` `{ id, map }`                     |
| `RetypeToFullWidthOptions`     | Options for `retypeToFullWidth`                                             |
| `RetypeToHalfWidthOptions`     | Same as `RetypeToFullWidthOptions`                                          |
| `RetypeToKatakanaSeionOptions` | Options for `retypeToKatakanaSeion`                                         |
| `RetypeToHiraganaSeionOptions` | Same as `RetypeToKatakanaSeionOptions`                                      |
| `TransformationType`           | The conversion values for `transformString`                                 |
| `TransformStringOptions`       | Options for `transformString`                                               |

## License

MIT
