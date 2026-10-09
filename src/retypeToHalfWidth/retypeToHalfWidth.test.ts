import retypeToHalfWidth from './retypeToHalfWidth';

describe('retypeToHalfWidth', () => {
  it('全角アルファベットを半角に変換する', () => {
    expect(retypeToHalfWidth('ａｂｃ')).toBe('abc');
    expect(retypeToHalfWidth('ＡＢＣ')).toBe('ABC');
  });

  it('全角数字を半角に変換する', () => {
    expect(retypeToHalfWidth('１２３')).toBe('123');
  });

  it('全角記号を半角に変換する', () => {
    expect(retypeToHalfWidth('！')).toBe('!');
  });

  it('全角スペースを半角に変換する', () => {
    expect(retypeToHalfWidth('　')).toBe(' ');
  });

  it('全角カタカナを半角カタカナに変換する', () => {
    expect(retypeToHalfWidth('アイウ')).toBe('ｱｲｳ');
  });

  it('disableAlphabet: trueでアルファベットの変換を無効化する', () => {
    expect(retypeToHalfWidth('ａ１', { disableAlphabet: true })).toBe('ａ1');
  });

  it('disableNumber: trueで数字の変換を無効化する', () => {
    expect(retypeToHalfWidth('ａ１', { disableNumber: true })).toBe('a１');
  });

  it('disableKana: trueでカタカナの変換を無効化する', () => {
    expect(retypeToHalfWidth('アａ', { disableKana: true })).toBe('アa');
  });
});
