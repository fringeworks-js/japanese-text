import { describe, expect, it } from 'vitest';
import toNfkd from './toNfkd';

describe('toNfkd', () => {
  describe('全角英数字 → 半角', () => {
    it('全角英字（大文字）が半角に変換される', () => {
      expect(toNfkd('ＡＢＣ')).toBe('ABC');
    });

    it('全角英字（小文字）が半角に変換される', () => {
      expect(toNfkd('ａｂｃ')).toBe('abc');
    });

    it('全角数字が半角に変換される', () => {
      expect(toNfkd('０１２３４５６７８９')).toBe('0123456789');
    });
  });

  describe('半角カナ → 全角カナ（分解）', () => {
    it('半角カタカナが全角カタカナに変換される', () => {
      expect(toNfkd('ｶﾅ')).toBe('カナ');
    });

    it('半角カナの濁音は合成されず分解されたままになる', () => {
      // NFKCは 'ガ'（1文字）に合成されるが、NFKDは 'カ' + '゛'（2文字）のまま
      const result = toNfkd('ｶﾞ');
      expect([...result]).toHaveLength(2);
      expect([...result][0]).toBe('カ');
    });

    it('半角カナの半濁音は合成されず分解されたままになる', () => {
      const result = toNfkd('ﾊﾟ');
      expect([...result]).toHaveLength(2);
      expect([...result][0]).toBe('ハ');
    });
  });

  describe('合成済みカナの分解', () => {
    it('全角カタカナの濁音が基底文字と結合文字に分解される', () => {
      const result = toNfkd('ガ');
      expect([...result]).toHaveLength(2);
      expect([...result][0]).toBe('カ');
    });

    it('全角カタカナの半濁音が基底文字と結合文字に分解される', () => {
      const result = toNfkd('パ');
      expect([...result]).toHaveLength(2);
      expect([...result][0]).toBe('ハ');
    });

    it('ひらがなの濁音が基底文字と結合文字に分解される', () => {
      const result = toNfkd('が');
      expect([...result]).toHaveLength(2);
      expect([...result][0]).toBe('か');
    });
  });

  describe('互換文字の変換', () => {
    it('丸数字が通常の文字列に変換される', () => {
      expect(toNfkd('㈱')).toBe('(株)');
    });

    it('ローマ数字が通常のアルファベットに変換される', () => {
      expect(toNfkd('Ⅳ')).toBe('IV');
    });

    it('全角記号が半角に変換される', () => {
      expect(toNfkd('！？＠')).toBe('!?@');
    });

    it('全角スペースも変換される', () => {
      expect(toNfkd('　')).toBe(' ');
    });
  });

  describe('変換されない文字', () => {
    it('半角英数字はそのまま', () => {
      expect(toNfkd('abc123')).toBe('abc123');
    });

    it('ひらがな（清音）はそのまま', () => {
      expect(toNfkd('あいう')).toBe('あいう');
    });

    it('全角カタカナ（清音）はそのまま', () => {
      expect(toNfkd('アイウ')).toBe('アイウ');
    });

    it('漢字はそのまま', () => {
      expect(toNfkd('漢字')).toBe('漢字');
    });
  });

  describe('NFKCとの違いの確認', () => {
    it('濁音の文字数がNFKCと異なる', () => {
      const nfkc = 'ガ'.normalize('NFKC');
      const nfkd = toNfkd('ガ');
      expect([...nfkc]).toHaveLength(1);
      expect([...nfkd]).toHaveLength(2);
    });
  });

  describe('空文字・複合', () => {
    it('空文字はそのまま返る', () => {
      expect(toNfkd('')).toBe('');
    });

    it('混在した文字列が正しく変換される', () => {
      const result = toNfkd('ＡＢＣｶﾅあいう漢字');
      // 英字・カナは変換、ひらがな・漢字はそのまま
      expect(result.startsWith('ABCカナ')).toBe(true);
      expect(result.endsWith('あいう漢字')).toBe(true);
    });
  });
});
