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
  });

  describe('ignoreChouon', () => {
    it('長音記号を除去する', () => {
      expect(normalizeString('コーヒー', { ignoreChouon: true })).toBe('コヒ');
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

  describe('ignoreLineFeed', () => {
    it('改行を除去する', () => {
      expect(normalizeString('hello\nworld', { ignoreLineFeed: true })).toBe(
        'helloworld',
      );
    });

    it('CRLFを除去する', () => {
      expect(normalizeString('hello\r\nworld', { ignoreLineFeed: true })).toBe(
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

  describe('nullValue / undefinedValue', () => {
    it('nullの場合にnullValueを返す', () => {
      expect(normalizeString(null as any, { nullValue: '' })).toBe('');
    });

    it('undefinedの場合にundefinedValueを返す', () => {
      expect(normalizeString(undefined as any, { undefinedValue: '' })).toBe(
        '',
      );
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
  describe('dataLast', () => {
    it('基本動作', () => {
      expect(normalizeString.dataLast({ ignoreCase: true })('Hello')).toBe(
        'hello',
      );
    });
  });
});
