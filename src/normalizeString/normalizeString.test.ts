import { isNormalizedEqual } from '../isNormalizedEqual';
import { toHalfWidth } from '../toHalfWidth';
import normalizeString from './normalizeString';

describe('normalizeString', () => {
  it('オプションなしの場合はそのまま返す', () => {
    expect(normalizeString('Hello World')).toBe('Hello World');
  });

  it('空文字', () => {
    expect(normalizeString('')).toBe('');
  });

  describe('ignoreKana', () => {
    it('ひらがな・カタカナを統一する（カタカナ → ひらがな）', () => {
      expect(normalizeString('アイウ', { ignoreKana: true })).toBe('あいう');
    });

    it('ひらがなはそのまま', () => {
      expect(normalizeString('あいう', { ignoreKana: true })).toBe('あいう');
    });
  });

  describe('ignoreWidth', () => {
    it('全角英字 → 半角に統一する', () => {
      expect(normalizeString('ａｂｃ', { ignoreWidth: true })).toBe('abc');
    });

    it('半角はそのまま', () => {
      expect(normalizeString('abc', { ignoreWidth: true })).toBe('abc');
    });

    it('ignoreKana と組み合わせると、半角・全角のカタカナとひらがながそろう', () => {
      const options = { ignoreWidth: true, ignoreKana: true };
      expect(normalizeString('ｱｶﾞﾊﾟｰ', options)).toBe('あがぱー');
      expect(normalizeString('アガパー', options)).toBe('あがぱー');
      expect(normalizeString('あがぱー', options)).toBe('あがぱー');
    });

    it('ignoreKana と組み合わせても、英数字・記号・空白は半角にそろえる', () => {
      expect(
        normalizeString('Ａ１－　', { ignoreWidth: true, ignoreKana: true }),
      ).toBe('A1- ');
    });

    it('カナ・句読点・かぎ括弧は半角にそろえる', () => {
      expect(normalizeString('「ガッコー」、。', { ignoreWidth: true })).toBe(
        '｢ｶﾞｯｺｰ｣､｡',
      );
    });

    it('ignoreKana と組み合わせると、句読点・かぎ括弧は全角にそろえる', () => {
      expect(
        normalizeString('｢ｱ｣､｡', { ignoreWidth: true, ignoreKana: true }),
      ).toBe('「あ」、。');
    });

    // かなを扱うオプションは、半角・全角のどちらのカナにも同じように効く
    it.each([
      ['ignoreDakuon', 'ガパ', 'ｶﾊ'],
      ['ignoreSokuon', 'ッ', 'ﾂ'],
      ['ignoreYouon', 'ャァ', 'ﾔｱ'],
      ['ignoreChouon', 'ラーメン', 'ﾗﾒﾝ'],
    ])('%s と組み合わせる', (name, fullWidth, expected) => {
      const options = { ignoreWidth: true, [name]: true };
      const halfWidth = toHalfWidth(fullWidth);
      expect(normalizeString(fullWidth, options)).toBe(expected);
      expect(normalizeString(halfWidth, options)).toBe(expected);
      expect(isNormalizedEqual(fullWidth, halfWidth, options)).toBe(true);
    });
  });

  describe('ignoreChouon', () => {
    it('長音記号を除去する', () => {
      expect(normalizeString('コーヒー', { ignoreChouon: true })).toBe('コヒ');
    });
  });

  describe('ignoreChouonVariant', () => {
    it('かなの直後の長音の代わりの記号を長音にそろえる', () => {
      expect(
        normalizeString('サ―バ メ-ル すご〜い', { ignoreChouonVariant: true }),
      ).toBe('サーバ メール すごーい');
    });

    it('かなの直後でない記号はそのまま残す', () => {
      expect(normalizeString('1－2', { ignoreChouonVariant: true })).toBe(
        '1－2',
      );
    });

    it('ignoreChouon と組み合わせると、長音の代わりの記号も除去する', () => {
      expect(
        normalizeString('サ―バー', {
          ignoreChouonVariant: true,
          ignoreChouon: true,
        }),
      ).toBe('サバ');
    });

    it('ignoreWidth と組み合わせると、半角カタカナの直後も対象にする', () => {
      const options = { ignoreWidth: true, ignoreChouonVariant: true };
      expect(normalizeString('ｻ―ﾊﾞ', options)).toBe('ｻｰﾊﾞ');
      expect(isNormalizedEqual('ｻ―ﾊﾞ', 'サーバ', options)).toBe(true);
    });

    it('ignoreSpace と組み合わせると、空白を除去して隣り合った記号も対象にする', () => {
      expect(
        normalizeString('サ ―', {
          ignoreSpace: true,
          ignoreChouonVariant: true,
        }),
      ).toBe('サー');
    });
  });

  describe('ignoreHyphenVariant', () => {
    it('かなの直後にないハイフンの代わりの記号をハイフンにそろえる', () => {
      expect(
        normalizeString('123ー4567 1－2―3 サーバ', {
          ignoreHyphenVariant: true,
        }),
      ).toBe('123-4567 1-2-3 サーバ');
    });

    it('ignoreChouon と組み合わせても、ハイフンにした長音記号は除去しない', () => {
      expect(
        normalizeString('123ー4567 サーバ', {
          ignoreHyphenVariant: true,
          ignoreChouon: true,
        }),
      ).toBe('123-4567 サバ');
    });

    it('ignoreDakuon で除去した濁点の後ろも、除去後の前の文字で判断する', () => {
      const options = { ignoreDakuon: true, ignoreHyphenVariant: true };
      expect(normalizeString('1゛―2', options)).toBe('1-2');
    });
  });

  describe('ignoreSpaceVariant', () => {
    it('各種のスペースを半角スペースにそろえる', () => {
      expect(normalizeString('a　b c', { ignoreSpaceVariant: true })).toBe(
        'a b c',
      );
    });
  });

  describe('ignoreTildeVariant', () => {
    it('波線を全角チルダにそろえる', () => {
      expect(normalizeString('1〜3 1~3', { ignoreTildeVariant: true })).toBe(
        '1～3 1～3',
      );
    });

    it('ignoreWidth と組み合わせると、半角のチルダにそろう', () => {
      expect(
        normalizeString('1〜3 1～3', {
          ignoreTildeVariant: true,
          ignoreWidth: true,
        }),
      ).toBe('1~3 1~3');
    });

    it('ignoreChouonVariant と組み合わせると、かなの直後の波線は長音になる', () => {
      expect(
        normalizeString('すご〜い 1〜3', {
          ignoreTildeVariant: true,
          ignoreChouonVariant: true,
        }),
      ).toBe('すごーい 1～3');
    });
  });

  describe('ignoreMiddleDotVariant', () => {
    it('中黒をそろえる', () => {
      expect(
        normalizeString('ジョン·スミス ジョン･スミス', {
          ignoreMiddleDotVariant: true,
        }),
      ).toBe('ジョン・スミス ジョン・スミス');
    });
  });

  describe('ignoreSpace', () => {
    it('スペースを除去する', () => {
      expect(normalizeString('hello world', { ignoreSpace: true })).toBe(
        'helloworld',
      );
    });

    it('全角スペースを除去する', () => {
      expect(normalizeString('hello　world', { ignoreSpace: true })).toBe(
        'helloworld',
      );
    });

    it('タブなどの空白文字を除去し、改行は除去しない', () => {
      const tab = String.fromCodePoint(0x09);
      const lineFeed = String.fromCodePoint(0x0a);
      expect(
        normalizeString('a' + tab + 'b' + lineFeed + 'c', {
          ignoreSpace: true,
        }),
      ).toBe('ab' + lineFeed + 'c');
    });
  });

  describe('ignoreLineBreak', () => {
    it('改行を除去する', () => {
      expect(normalizeString('hello\nworld', { ignoreLineBreak: true })).toBe(
        'helloworld',
      );
    });

    it('CRLFを除去する', () => {
      expect(normalizeString('hello\r\nworld', { ignoreLineBreak: true })).toBe(
        'helloworld',
      );
    });
  });

  describe('ignoreDakuon', () => {
    it('ひらがな濁音 → 清音に統一する', () => {
      expect(normalizeString('ばびぶべぼ', { ignoreDakuon: true })).toBe(
        'はひふへほ',
      );
    });

    it('カタカナ濁音 → 清音に統一する', () => {
      expect(normalizeString('バビブベボ', { ignoreDakuon: true })).toBe(
        'ハヒフヘホ',
      );
    });

    it('ignoreDakuon + ignoreKana でカタカナ変換をスキップ', () => {
      expect(
        normalizeString('ばバ', { ignoreDakuon: true, ignoreKana: true }),
      ).toBe('はは');
    });

    it('濁音の踊り字（ゞ・ヾ）を清音の踊り字にそろえる', () => {
      expect(normalizeString('ゞヾ', { ignoreDakuon: true })).toBe('ゝヽ');
      expect(
        normalizeString('ゞヾ', { ignoreDakuon: true, ignoreKana: true }),
      ).toBe('ゝゝ');
    });
  });

  describe('ignoreSokuon', () => {
    it('ひらがな促音(っ) → 清音(つ)に統一する', () => {
      expect(normalizeString('っつ', { ignoreSokuon: true })).toBe('つつ');
    });

    it('カタカナ促音(ッ) → 清音(ツ)に統一する', () => {
      expect(normalizeString('ッツ', { ignoreSokuon: true })).toBe('ツツ');
    });

    it('ignoreSokuon + ignoreKana でカタカナ変換をスキップ', () => {
      expect(
        normalizeString('っッ', { ignoreSokuon: true, ignoreKana: true }),
      ).toBe('つつ');
    });
  });

  describe('ignoreYouon', () => {
    it('ひらがな拗音(ゃゅょ) → 清音(やゆよ)に統一する', () => {
      expect(normalizeString('ゃゅょ', { ignoreYouon: true })).toBe('やゆよ');
    });

    it('カタカナ拗音(ャュョ) → 清音(ヤユヨ)に統一する', () => {
      expect(normalizeString('ャュョ', { ignoreYouon: true })).toBe('ヤユヨ');
    });

    it('ignoreYouon + ignoreKana でカタカナ変換をスキップ', () => {
      expect(
        normalizeString('ゃャ', { ignoreYouon: true, ignoreKana: true }),
      ).toBe('やや');
    });
  });

  describe('ignoreCase', () => {
    it('大文字 → 小文字に統一する', () => {
      expect(normalizeString('Hello World', { ignoreCase: true })).toBe(
        'hello world',
      );
    });

    it('小文字はそのまま', () => {
      expect(normalizeString('hello', { ignoreCase: true })).toBe('hello');
    });
  });

  describe('ignoreCompatibility', () => {
    it('全角英字 → 半角に正規化する（NFKC）', () => {
      expect(normalizeString('ａｂｃ', { ignoreCompatibility: true })).toBe(
        'abc',
      );
    });

    it('半角カタカナ → 全角に正規化する（NFKC）', () => {
      expect(normalizeString('ｱｲｳ', { ignoreCompatibility: true })).toBe(
        'アイウ',
      );
    });
  });

  describe('ignoreComposition', () => {
    it('NFD形式の文字をNFCに正規化する（か+結合濁点 → が）', () => {
      // 'が' = か(U+304B) + 結合濁点(U+3099) = NFD形式のが(2コードユニット)
      // 'が' = が(U+304C) = NFC形式のが(1コードユニット)
      expect(normalizeString('が', { ignoreComposition: true })).toBe('が');
    });
  });
  describe('ignoreDakuon の濁点・半濁点', () => {
    it('結合用の濁点・半濁点を除去する', () => {
      expect(normalizeString('か\u3099は\u309a', { ignoreDakuon: true })).toBe(
        'かは',
      );
    });

    it('単独の濁点・半濁点を除去する', () => {
      expect(normalizeString('か゛は゜ｶﾞﾊﾟ', { ignoreDakuon: true })).toBe(
        'かはｶﾊ',
      );
    });

    it('濁音の後ろに残った半濁点も除去する', () => {
      expect(
        normalizeString('パ\u309a', {
          ignoreComposition: true,
          ignoreDakuon: true,
        }),
      ).toBe('ハ');
    });
  });

  describe('2回適用しても結果が変わらない', () => {
    it('空白を除去して隣り合った濁点を合成する', () => {
      expect(
        normalizeString('か \u3099', {
          ignoreComposition: true,
          ignoreSpace: true,
        }),
      ).toBe('が');
    });

    it('互換文字の濁点から生じた空白を除去しても濁点が残らない', () => {
      expect(
        normalizeString('か゛', {
          ignoreCompatibility: true,
          ignoreSpace: true,
          ignoreDakuon: true,
        }),
      ).toBe('か');
    });

    it('促音を清音にした後に残った濁点を合成する', () => {
      expect(
        normalizeString('っ\u3099', {
          ignoreComposition: true,
          ignoreSokuon: true,
        }),
      ).toBe('づ');
    });

    it('長音を除去して隣り合った濁点を合成し、ひらがなにする', () => {
      expect(
        normalizeString('カー\u3099', {
          ignoreComposition: true,
          ignoreKana: true,
          ignoreChouon: true,
        }),
      ).toBe('が');
    });

    const OPTION_NAMES = [
      'ignoreCompatibility',
      'ignoreComposition',
      'ignoreWidth',
      'ignoreCase',
      'ignoreKana',
      'ignoreDakuon',
      'ignoreSokuon',
      'ignoreYouon',
      'ignoreChouon',
      'ignoreChouonVariant',
      'ignoreHyphenVariant',
      'ignoreSpaceVariant',
      'ignoreTildeVariant',
      'ignoreMiddleDotVariant',
      'ignoreLineBreak',
      'ignoreSpace',
    ] as const;
    const SAMPLES = [
      'か゛',
      'か \u3099',
      'パ\u309a',
      'っ\u3099',
      'ゃ\u309a',
      'カー\u3099',
      'ウ\n\u3099',
      'ｶ ﾞﾊﾟｯｬｰ',
      'ガッコー　ＡＢＣ',
      'İß㍿ヷゝゞ',
      'ﾟİ゜İ',
      'サ―バ－ーメ-ル~ ―すご〜い',
      'ｻ ﾞ―1－2',
      '123ー4567 ｻｰ〜1～2･ジョン· ',
    ];

    it.each(SAMPLES)('すべてのオプションの組み合わせ: %s', (sample) => {
      for (let bits = 0; bits < 1 << OPTION_NAMES.length; bits++) {
        const options = Object.fromEntries(
          OPTION_NAMES.map((name, i) => [name, (bits & (1 << i)) !== 0]),
        );
        const once = normalizeString(sample, options);
        expect(normalizeString(once, options), JSON.stringify(options)).toBe(
          once,
        );
      }
    });
  });
});
