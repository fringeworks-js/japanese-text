import toHalfWidth from './toHalfWidth';

describe('toHalfWidth', () => {
  it('全角アルファベットを半角に変換する', () => {
    expect(toHalfWidth('ａｂｃ')).toBe('abc');
    expect(toHalfWidth('ＡＢＣ')).toBe('ABC');
  });

  it('全角数字を半角に変換する', () => {
    expect(toHalfWidth('１２３')).toBe('123');
  });

  it('全角記号を半角に変換する', () => {
    expect(toHalfWidth('！')).toBe('!');
  });

  it('全角スペースを半角に変換する', () => {
    expect(toHalfWidth('　')).toBe(' ');
  });

  it('全角カタカナを半角カタカナに変換する', () => {
    expect(toHalfWidth('アイウ')).toBe('ｱｲｳ');
  });

  it('keepAlphabet: trueでアルファベットの変換を無効化する', () => {
    expect(toHalfWidth('ａ１', { keepAlphabet: true })).toBe('ａ1');
  });

  it('keepNumber: trueで数字の変換を無効化する', () => {
    expect(toHalfWidth('ａ１', { keepNumber: true })).toBe('a１');
  });

  it('keepKana: trueでカタカナの変換を無効化する', () => {
    expect(toHalfWidth('アａ', { keepKana: true })).toBe('アa');
  });

  it('keepKana: trueで句読点・かぎ括弧・中黒の変換も無効化する', () => {
    expect(toHalfWidth('。「」、・！', { keepKana: true })).toBe('。「」、・!');
  });

  it('keepSymbol: trueで記号の変換を無効化する', () => {
    expect(toHalfWidth('！。', { keepSymbol: true })).toBe('！｡');
  });
});
