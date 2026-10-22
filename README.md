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

---

## API

| Function                                  | Description                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| `convertByTable(str, tables)`             | Converts text according to conversion tables                              |
| `getShiftJisByteLength(str)`              | Returns the byte length of a string in Shift_JIS                          |
| `isFullWidth(str, options?)`              | Checks whether a string consists only of full-width characters            |
| `isHalfWidth(str, options?)`              | Checks whether a string consists only of half-width characters            |
| `isNormalizedEqual(str1, str2, options?)` | Checks whether two strings are equal after normalization                  |
| `isShiftJisDoubleByte(str)`               | Checks whether a string consists only of Shift_JIS double-byte characters |
| `isShiftJisSingleByte(str)`               | Checks whether a string consists only of Shift_JIS single-byte characters |
| `normalizeString(str, options?)`          | Removes variations in notation to make strings comparable                 |
| `removeChouon(str)`                       | Removes the prolonged sound mark (`ー`)                                   |
| `removeLineBreaks(str)`                   | Removes line breaks                                                       |
| `removeSpaces(str)`                       | Removes half-width and full-width spaces                                  |
| `removeWhitespace(str)`                   | Removes whitespace other than line breaks                                 |
| `toFullWidth(str, options?)`              | Converts half-width characters to full-width                              |
| `toHalfWidth(str, options?)`              | Converts full-width characters to half-width                              |
| `toHiragana(str)`                         | Converts katakana to hiragana                                             |
| `toHiraganaSeion(str, options?)`          | Converts voiced, small, and geminate hiragana to their plain forms        |
| `toKatakana(str)`                         | Converts hiragana to katakana                                             |
| `toKatakanaSeion(str, options?)`          | Converts voiced, small, and geminate katakana to their plain forms        |
| `toNfc(data)`, ...                        | Applies Unicode normalization                                             |
| `transformString(str, types, options?)`   | Applies several conversions in order                                      |
| `unifyChouon(str, options?)`              | Unifies symbols used in place of the prolonged sound mark                 |
| `unifyDoubleQuotes(str, options?)`        | Unifies the kinds of double quotes                                        |
| `unifyHyphens(str, options?)`             | Unifies symbols used in place of the hyphen into the hyphen               |
| `unifyLineBreaks(str, options?)`          | Unifies the kinds of line breaks                                          |
| `unifyMiddleDots(str, options?)`          | Unifies the kinds of middle dots                                          |
| `unifySingleQuotes(str, options?)`        | Unifies the kinds of single quotes                                        |
| `unifySpaces(str, options?)`              | Unifies the kinds of spaces                                               |
| `unifyTildes(str, options?)`              | Unifies the kinds of tildes                                               |

### `convertByTable`

```ts
convertByTable(str: string, tables: ConversionTable | (ConversionTable | false | null | undefined)[]): string
```

Converts text according to conversion tables. Several tables are merged into one before conversion. `false`, `null` and `undefined` in the array are ignored, so tables can be listed conditionally, as in `[useKana && TO_HIRAGANA]`. When several tables have the same source string, the later table wins. Merged tables and converters are cached for each combination of table objects and their order. Creating a table on every call defeats the cache, so define tables as constants and reuse them.

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

Returns the byte length of a string encoded in Shift_JIS. Shift_JIS follows the WHATWG Encoding Standard (equivalent to Windows-31J), which is the same conversion browsers use when submitting a form in Shift_JIS. Control characters such as line breaks count as one byte. `¥` and `‾` count as one byte, and the minus sign (`−` U+2212) counts as two bytes. The encoder writes them as the bytes of `\`, `~`, and `－` (U+FF0D) respectively, so they become those characters when the receiver decodes them. Returns `null` when the string contains a character that Shift_JIS cannot represent (including user-defined characters). Returns `0` for an empty string.

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
isNormalizedEqual(str1: string, str2: string, options?: IsNormalizedEqualOptions): boolean
```

Normalizes two strings with `normalizeString` and checks whether they are equal. How to normalize is set with the options of `normalizeString` (nothing is normalized if none are given).

```ts
isNormalizedEqual('ＡＢＣ', 'abc', { ignoreWidth: true, ignoreCase: true }); // true
```

| Option         | Type                     | Description                         |
| -------------- | ------------------------ | ----------------------------------- |
| `rawFirst?`    | `boolean`                | If `true`, `str1` is not normalized |
| `rawSecond?`   | `boolean`                | If `true`, `str2` is not normalized |
| `ignore*`, ... | `NormalizeStringOptions` | Options of `normalizeString`        |

### `isShiftJisDoubleByte`

```ts
isShiftJisDoubleByte(str: string): boolean
```

Checks whether a string consists only of Shift_JIS double-byte characters (JIS X 0208 characters and Windows-31J extensions such as `①`). Shift_JIS is defined as in `getShiftJisByteLength`. The wave dash (`〜` U+301C) cannot be represented in Windows-31J, so strings containing it return `false`. The minus sign (`−` U+2212) is treated as a double-byte character, since it can be written as the bytes of the full-width hyphen-minus (`－` U+FF0D). Returns `false` for an empty string.

### `isShiftJisSingleByte`

```ts
isShiftJisSingleByte(str: string): boolean
```

Checks whether a string consists only of Shift_JIS single-byte characters (printable ASCII, half-width katakana, `¥`, and `‾`). Control characters are not included. Returns `false` for an empty string.

### `normalizeString`

```ts
normalizeString(str: string, options?: NormalizeStringOptions): string
```

Removes variations in notation, such as full-width and half-width forms or upper and lower case, so that strings can be searched and compared. The options choose which differences to remove (nothing is converted if none are given).

The kana options (`ignoreKana`, `ignoreDakuon`, `ignoreSokuon`, `ignoreYouon`, `ignoreChouon`) apply to full-width kana. To apply them to half-width katakana as well, also specify `ignoreWidth` or `ignoreCompatibility`.

```ts
normalizeString('ＡＢＣ', { ignoreWidth: true, ignoreCase: true }); // 'abc'
normalizeString('ガッコウ', {
  ignoreKana: true,
  ignoreDakuon: true,
  ignoreSokuon: true,
}); // 'かつこう'
normalizeString('㈱ｶﾞ', { ignoreCompatibility: true }); // '(株)ガ'
```

| Option                    | Type      | Description                                                                                                                                                            |
| ------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignoreCompatibility?`    | `boolean` | Ignores differences between compatibility characters (NFKC normalization). Makes `ignoreComposition` and `ignoreWidth` unnecessary                                     |
| `ignoreComposition?`      | `boolean` | Ignores differences between composed and decomposed characters (NFC normalization)                                                                                     |
| `ignoreWidth?`            | `boolean` | Ignores full-width and half-width differences (converts to half-width; with `ignoreKana`, half-width kana are converted to full-width and then to hiragana)            |
| `ignoreCase?`             | `boolean` | Ignores upper and lower case (converts to lowercase)                                                                                                                   |
| `ignoreKana?`             | `boolean` | Ignores hiragana and katakana differences (converts to hiragana)                                                                                                       |
| `ignoreDakuon?`           | `boolean` | Ignores voiced (`ば`) and semi-voiced (`ぱ`) marks versus the plain form (`は`). Standalone voiced and semi-voiced marks (`゛`, `ﾞ`, combining marks, ...) are removed |
| `ignoreSokuon?`           | `boolean` | Ignores the small `っ` versus the plain `つ`                                                                                                                           |
| `ignoreYouon?`            | `boolean` | Ignores small kana (`ゃ`) versus the plain form (`や`)                                                                                                                 |
| `ignoreChouonVariant?`    | `boolean` | Ignores variations of the prolonged sound mark (symbols used in its place right after kana are unified to `ー`; see `unifyChouon`)                                     |
| `ignoreHyphenVariant?`    | `boolean` | Ignores variations of the hyphen (symbols used in its place not right after kana are unified to `-`; see `unifyHyphens`)                                               |
| `ignoreSpaceVariant?`     | `boolean` | Ignores the kinds of spaces (unified to the half-width space; see `unifySpaces`)                                                                                       |
| `ignoreTildeVariant?`     | `boolean` | Ignores the kinds of tildes (unified to `～`; see `unifyTildes`)                                                                                                       |
| `ignoreMiddleDotVariant?` | `boolean` | Ignores the kinds of middle dots (unified to `・`; see `unifyMiddleDots`)                                                                                              |
| `ignoreChouon?`           | `boolean` | Ignores the prolonged sound mark (`ー`)                                                                                                                                |
| `ignoreLineBreak?`        | `boolean` | Ignores line breaks (CR, LF, and the Unicode line and paragraph separators)                                                                                            |
| `ignoreSpace?`            | `boolean` | Ignores whitespace other than line breaks (half-width and full-width spaces, tabs, no-break spaces, ...)                                                               |

### `removeChouon`

```ts
removeChouon(str: string): string
```

Removes the prolonged sound mark (`ー`). The half-width mark (`ｰ`) is not removed. To remove it as well, convert it to full-width with `toFullWidth` first.

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
```

Converts half-width letters, digits, symbols, spaces, and kana to full-width. Kana covers the whole half-width kana set (katakana and `｡`, `｢`, `｣`, `､`, `･`, `ｰ`, `ﾞ`, `ﾟ`). `ﾜﾞ` and `ｦﾞ` become `ワ゛` and `ヲ゛`, not the precomposed `ヷ` and `ヺ`.

```ts
toFullWidth('abc 123 ｱｲｳ'); // 'ａｂｃ　１２３　アイウ'
toFullWidth('abc 123', { keepNumber: true }); // 'ａｂｃ　123'
```

| Option          | Type      | Description                                                                                           |
| --------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `keepAlphabet?` | `boolean` | If `true`, letters are kept as is                                                                     |
| `keepNumber?`   | `boolean` | If `true`, digits are kept as is                                                                      |
| `keepSymbol?`   | `boolean` | If `true`, symbols (except Japanese punctuation, corner brackets, and the middle dot) are kept as is  |
| `keepSpace?`    | `boolean` | If `true`, spaces are kept as is                                                                      |
| `keepKana?`     | `boolean` | If `true`, kana (katakana, Japanese punctuation, corner brackets, the middle dot, ...) are kept as is |

### `toHalfWidth`

```ts
toHalfWidth(str: string, options?: ToHalfWidthOptions): string
```

Converts full-width letters, digits, symbols, spaces, and kana to half-width. The target characters and options are the same as `toFullWidth`. Characters without a half-width form (`ヰ`, `ヵ`, `ヷ`, ...) are left as is.

### `toHiragana` / `toKatakana`

```ts
toHiragana(str: string): string
toKatakana(str: string): string
```

Converts katakana to hiragana (`toHiragana`) or hiragana to katakana (`toKatakana`). Only full-width kana are converted. To convert half-width katakana as well, convert it to full-width with `toFullWidth` first. `ヵ` and `ヶ` (often used as counters, as in `3ヶ月`) and `ヷ`, `ヸ`, `ヹ`, `ヺ` (which have no hiragana counterpart) are not converted.

### `toHiraganaSeion` / `toKatakanaSeion`

```ts
toHiraganaSeion(str: string, options?: ToHiraganaSeionOptions): string
toKatakanaSeion(str: string, options?: ToKatakanaSeionOptions): string
```

Converts voiced and semi-voiced kana, the small `っ`, and other small kana in hiragana (`toHiraganaSeion`) or katakana (`toKatakanaSeion`) to their plain forms. The voiced iteration marks (`ゞ`, `ヾ`) also become plain iteration marks. Only full-width kana are converted; half-width katakana and `ヷ`, `ヸ`, `ヹ`, `ヺ` are left as is.

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
```

Applies the conversions in `types` in the given order.

```ts
transformString('ﾊﾛｰ', ['toFullWidth', 'toHiragana']); // 'はろー'
transformString('hello world', [TransformationType.toPascalCase]); // 'HelloWorld'
```

The available conversions (values of `TransformationType`) are:

| Kind                    | Values                                                                                                                                                                                       |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full-width / half-width | `toFullWidth`, `toFullWidthAlphabet`, `toFullWidthNumber`, `toFullWidthSymbol`, `toFullWidthSpace`, `toFullWidthKana`, `toHalfWidth`, and the matching `toHalfWidth*`                        |
| Hiragana / katakana     | `toHiragana`, `toKatakana`                                                                                                                                                                   |
| Plain forms             | `toHiraganaSeion`, `toHiraganaSeionFromDakuon`, `toHiraganaSeionFromSokuon`, `toHiraganaSeionFromYouon`, and the matching `toKatakanaSeion*`                                                 |
| Unification             | `unifyChouon`, `unifyHyphens`, `unifySpaces`, `unifyLineBreaks`, `unifyTildes`, `unifyMiddleDots`, `unifyDoubleQuotes`, `unifySingleQuotes`                                                  |
| Removal                 | `removeChouon`, `removeLineBreaks`, `removeSpaces`, `removeWhitespace`                                                                                                                       |
| Case                    | `toCamelCase`, `toDotCase`, `toFlatCase`, `toKebabCase`, `toLowerCase`, `toPascalCase`, `toScreamingSnakeCase`, `toSentenceCase`, `toSnakeCase`, `toTitleCase`, `toTrainCase`, `toUpperCase` |
| Unicode normalization   | `toNfc`, `toNfd`, `toNfkc`, `toNfkd`                                                                                                                                                         |

| Option           | Type      | Description                                                                                                                                           |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `composeTables?` | `boolean` | If `true`, consecutive table-based conversions are merged into one table. This is faster, but some combinations of conversions give different results |

### `unifyChouon` / `unifyHyphens`

```ts
unifyChouon(str: string, options?: UnifyChouonOptions): string
unifyHyphens(str: string, options?: UnifyHyphensOptions): string
```

The prolonged sound mark and the hyphen are often written with similar horizontal symbols, so they are told apart by the preceding character. A horizontal symbol right after kana (full-width hiragana and katakana and half-width katakana, including voiced marks and iteration marks) is treated as the prolonged sound mark, and any other one as a hyphen. The two functions are exact counterparts: applying either first, or both, gives the same result.

- `unifyChouon` unifies the characters in `CHOUON_VARIANTS` (the prolonged sound mark and horizontal symbols and tildes such as `―`, `－`, `-`, and `〜`) right after kana into the prolonged sound mark. Without `to`, it follows the width of the preceding kana: `ー` after full-width kana and `ｰ` after half-width katakana
- `unifyHyphens` unifies the characters in `HYPHEN_VARIANTS` (hyphens, dashes, minus signs, and the prolonged sound mark used in place of a hyphen, as in `123ー4567`) not right after kana into `-`. Tildes and box-drawing lines are not turned into hyphens

The kanji `一` and letters of other scripts such as Hangul are not targeted. Consecutive symbols are replaced one by one.

```ts
unifyChouon('サ―バ ｻ―ﾊﾞ すご〜い 1－2'); // 'サーバ ｻｰﾊﾞ すごーい 1－2'
unifyHyphens('サ―バ 123ー4567 東京―大阪'); // 'サ―バ 123-4567 東京-大阪'
unifyChouon('サーバ―', { to: '-' }); // 'サ-バ-'
unifyHyphens('サーバ 1－2', { always: true }); // 'サ-バ 1-2'
```

| Option    | Type                              | Description                                                                                                                                                                                                                                |
| --------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `to?`     | `ChouonVariant` / `HyphenVariant` | The character to unify into. The prolonged sound mark or hyphen itself is also a target, so it becomes this character too. Default is the prolonged sound mark matching the preceding kana for `unifyChouon`, and `'-'` for `unifyHyphens` |
| `always?` | `boolean`                         | If `true`, all target characters are unified regardless of whether they follow kana (`ー` for `unifyChouon` without `to`). Default is `false`                                                                                              |

### `unifySpaces` and others

```ts
unifySpaces(str: string, options?: UnifySpacesOptions): string
unifyLineBreaks(str: string, options?: UnifyLineBreaksOptions): string
unifyTildes(str: string, options?: UnifyTildesOptions): string
unifyMiddleDots(str: string, options?: UnifyMiddleDotsOptions): string
unifyDoubleQuotes(str: string, options?: UnifyDoubleQuotesOptions): string
unifySingleQuotes(str: string, options?: UnifySingleQuotesOptions): string
```

Unifies different characters of the same kind into one character, without looking at the surrounding characters. The target characters are listed in each function's constant.

```ts
unifySpaces('a\u3000b\u00a0c'); // 'a b c'
unifySpaces('a b', { to: '\u3000' }); // 'a　b'
unifyLineBreaks('a\r\nb\rc', { to: '\r\n' }); // 'a\r\nb\r\nc'
unifyTildes('1〜3'); // '1～3'
unifyDoubleQuotes('“a”'); // '"a"'
```

| Function            | Targets                                                                                                                                   | Default target | Notes                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `unifySpaces`       | `SPACE_VARIANTS`: half-width and full-width spaces, no-break spaces, and spaces of various widths                                         | `' '`          | Tabs and line breaks are not targeted. Consecutive spaces are not collapsed                                                                     |
| `unifyLineBreaks`   | `LINE_BREAK_VARIANTS`: CRLF, CR, LF, and the Unicode line and paragraph separators                                                        | `'\n'`         | CRLF is treated as one line break                                                                                                               |
| `unifyTildes`       | `TILDE_VARIANTS`: the full-width tilde (`～` U+FF5E), the wave dash (`〜` U+301C), the half-width tilde, `〰`, and `∼`                    | `'～'`         | The default `～` can also be represented in Windows-31J. To turn tildes right after kana into the prolonged sound mark, use `unifyChouon` first |
| `unifyMiddleDots`   | `MIDDLE_DOT_VARIANTS`: the middle dot, the half-width middle dot, and Western middle dots (`·`, `‧`, `⋅`)                                 | `'・'`         |                                                                                                                                                 |
| `unifyDoubleQuotes` | `DOUBLE_QUOTE_VARIANTS`: half-width and full-width double quotes, curly quotes (`“`, `”`, `„`, `‟`), and double primes (`〝`, `〟`, `〞`) | `'"'`          | Quotes that distinguish opening and closing cannot be targets, so the result is always a straight quote                                         |
| `unifySingleQuotes` | `SINGLE_QUOTE_VARIANTS`: half-width and full-width single quotes and curly quotes (`‘`, `’`, `‚`, `‛`)                                    | `"'"`          | Same as above                                                                                                                                   |

| Option | Type                 | Description                                                      |
| ------ | -------------------- | ---------------------------------------------------------------- |
| `to?`  | `SpaceVariant`, etc. | The character to unify into, chosen from the function's constant |

### Constants

| Constant                | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| `TransformationType`    | The conversions that can be passed to `transformString`         |
| `CHOUON_VARIANTS`       | The characters `unifyChouon` treats as the prolonged sound mark |
| `HYPHEN_VARIANTS`       | The characters `unifyHyphens` treats as hyphens                 |
| `SPACE_VARIANTS`        | The characters `unifySpaces` unifies                            |
| `LINE_BREAK_VARIANTS`   | The characters `unifyLineBreaks` unifies                        |
| `TILDE_VARIANTS`        | The characters `unifyTildes` unifies                            |
| `MIDDLE_DOT_VARIANTS`   | The characters `unifyMiddleDots` unifies                        |
| `DOUBLE_QUOTE_VARIANTS` | The characters `unifyDoubleQuotes` unifies                      |
| `SINGLE_QUOTE_VARIANTS` | The characters `unifySingleQuotes` unifies                      |

### Types

| Type                       | Description                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| `AmbiguousWidth`           | How to treat characters of ambiguous width: `'full'`, `'half'`, `'neither'` |
| `ChouonVariant`            | A character in `CHOUON_VARIANTS`                                            |
| `HyphenVariant`            | A character in `HYPHEN_VARIANTS`                                            |
| `SpaceVariant`             | A character in `SPACE_VARIANTS`                                             |
| `LineBreakVariant`         | A character in `LINE_BREAK_VARIANTS`                                        |
| `TildeVariant`             | A character in `TILDE_VARIANTS`                                             |
| `MiddleDotVariant`         | A character in `MIDDLE_DOT_VARIANTS`                                        |
| `DoubleQuoteVariant`       | A character in `DOUBLE_QUOTE_VARIANTS`                                      |
| `SingleQuoteVariant`       | A character in `SINGLE_QUOTE_VARIANTS`                                      |
| `ConversionTable`          | A conversion table for `convertByTable` `{ entries }`                       |
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
| `UnifyChouonOptions`       | Options for `unifyChouon`                                                   |
| `UnifyHyphensOptions`      | Options for `unifyHyphens`                                                  |
| `UnifySpacesOptions`       | Options for `unifySpaces`                                                   |
| `UnifyLineBreaksOptions`   | Options for `unifyLineBreaks`                                               |
| `UnifyTildesOptions`       | Options for `unifyTildes`                                                   |
| `UnifyMiddleDotsOptions`   | Options for `unifyMiddleDots`                                               |
| `UnifyDoubleQuotesOptions` | Options for `unifyDoubleQuotes`                                             |
| `UnifySingleQuotesOptions` | Options for `unifySingleQuotes`                                             |

## Changes to Conversion Tables

Characters may be added to the conversion tables, or mistakes in them fixed. Since this changes conversion results, such changes are released in a minor version from 1.0.0 on and noted in the CHANGELOG. Additions that would significantly change the default behavior (such as changing how commonly used characters are handled) are enabled through options.

If you persist conversion results, for example as search keys stored in a database, check whether the stored values need to be regenerated when you upgrade.

## License

MIT
