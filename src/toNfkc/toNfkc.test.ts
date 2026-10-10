import { describe, expect, it } from 'vitest';
import toNfkc from './toNfkc';

describe('toNfkc', () => {
  describe('全角英数字 → 半角', () => {
    it('全角英字（大文字）が半角に変換される', () => {
      expect(toNfkc('ＡＢＣ')).toBe('ABC');
    });

    it('全角英字（小文字）が半角に変換される', () => {
      expect(toNfkc('ａｂｃ')).toBe('abc');
    });

    it('全角数字が半角に変換される', () => {
      expect(toNfkc('０１２３４５６７８９')).toBe('0123456789');
    });
  });

  describe('半角カナ → 全角カナ', () => {
    it('半角カタカナが全角カタカナに変換される', () => {
      expect(toNfkc('ｶﾅ')).toBe('カナ');
    });

    it('半角カナの濁音が合成される', () => {
      expect(toNfkc('ｶﾞ')).toBe('ガ');
    });

    it('半角カナの半濁音が合成される', () => {
      expect(toNfkc('ﾊﾟ')).toBe('パ');
    });
  });

  describe('互換文字の変換', () => {
    it('丸数字が通常の文字列に変換される', () => {
      expect(toNfkc('㈱')).toBe('(株)');
    });

    it('ローマ数字が通常のアルファベットに変換される', () => {
      expect(toNfkc('Ⅳ')).toBe('IV');
    });

    it('全角記号が半角に変換される', () => {
      expect(toNfkc('！？＠')).toBe('!?@');
    });

    it('全角スペースも変換される', () => {
      expect(toNfkc('　')).toBe(' ');
    });
  });

  describe('変換されない文字', () => {
    it('半角英数字はそのまま', () => {
      expect(toNfkc('abc123')).toBe('abc123');
    });

    it('ひらがなはそのまま', () => {
      expect(toNfkc('あいう')).toBe('あいう');
    });

    it('全角カタカナはそのまま', () => {
      expect(toNfkc('アイウ')).toBe('アイウ');
    });

    it('漢字はそのまま', () => {
      expect(toNfkc('漢字')).toBe('漢字');
    });
  });

  describe('空文字・複合', () => {
    it('空文字はそのまま返る', () => {
      expect(toNfkc('')).toBe('');
    });

    it('混在した文字列が正しく変換される', () => {
      expect(toNfkc('ＡＢＣ１２３ｶﾅあいう漢字')).toBe('ABC123カナあいう漢字');
    });
  });

  describe('dataLast', () => {
    it('基本動作', () => {
      expect(toNfkc.dataLast()('ａｂｃ')).toBe('abc');
    });
  });
});
