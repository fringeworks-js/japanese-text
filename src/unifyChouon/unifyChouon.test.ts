import { unifyHyphens } from '../unifyHyphens';
import { CHOUON_VARIANTS } from './constants';
import unifyChouon from './unifyChouon';

describe('unifyChouon', () => {
  it.each(CHOUON_VARIANTS)('かなの直後の %s を長音記号にする', (char) => {
    expect(unifyChouon(`サ${char}バ`)).toBe('サーバ');
    expect(unifyChouon(`すご${char}い`)).toBe('すごーい');
  });

  it('続く文字は1文字ずつ長音記号にする', () => {
    expect(unifyChouon('ガ―ー〜ン')).toBe('ガーーーン');
  });

  it('かなの直後でない記号はそのまま残す', () => {
    expect(unifyChouon('1－2－3')).toBe('1－2－3');
    expect(unifyChouon('東京―大阪')).toBe('東京―大阪');
    expect(unifyChouon('1〜3')).toBe('1〜3');
    expect(unifyChouon('a-b~c')).toBe('a-b~c');
    expect(unifyChouon('―サ')).toBe('―サ');
  });

  it('漢字の「一」は対象外', () => {
    expect(unifyChouon('カ一ド')).toBe('カ一ド');
    expect(unifyChouon('メニュー一覧')).toBe('メニュー一覧');
  });

  it('半角カタカナの直後は半角の長音記号にする', () => {
    expect(unifyChouon('ｻ―ﾊﾞ')).toBe('ｻｰﾊﾞ');
    expect(unifyChouon('ｻｰﾊﾞ')).toBe('ｻｰﾊﾞ');
    expect(unifyChouon('ｶﾞ-')).toBe('ｶﾞｰ');
  });

  it('全角のかなの直後の半角の長音記号は全角にする', () => {
    expect(unifyChouon('サｰバ')).toBe('サーバ');
  });

  it('濁点・半濁点や踊り字の直後も対象にする', () => {
    expect(unifyChouon('が―')).toBe('がー');
    expect(unifyChouon('カ゛―')).toBe('カ゛ー');
    expect(unifyChouon('ゝ―')).toBe('ゝー');
  });

  it('to で統一後の文字を指定できる（長音記号も、半角カタカナの直後も対象）', () => {
    expect(unifyChouon('サーバ―', { to: '-' })).toBe('サ-バ-');
    expect(unifyChouon('すご〜い', { to: '～' })).toBe('すご～い');
    expect(unifyChouon('ｻ―', { to: 'ー' })).toBe('ｻー');
  });

  it('always の場合は、かなの直後かどうかに関係なく長音記号にする', () => {
    expect(unifyChouon('1－2 ｻ―', { always: true })).toBe('1ー2 ｻー');
    expect(unifyChouon('1－2', { always: true, to: '-' })).toBe('1-2');
  });

  it('2回適用しても結果が変わらない', () => {
    for (const to of [undefined, ...CHOUON_VARIANTS]) {
      for (const always of [false, true]) {
        const options = { to, always };
        const once = unifyChouon('サ―バ－ーメ-ル~ ｻ―1－2', options);
        expect(unifyChouon(once, options)).toBe(once);
      }
    }
  });

  it('unifyHyphens と対になり、どちらを先に適用しても結果が同じ', () => {
    const samples = ['サ―バ 123ー4567 東京―大阪', 'ｻ〜-1ｰ2', 'ー―サ'];
    for (const sample of samples) {
      expect(unifyHyphens(unifyChouon(sample))).toBe(
        unifyChouon(unifyHyphens(sample)),
      );
    }
  });

  it('空文字は空文字を返す', () => {
    expect(unifyChouon('')).toBe('');
  });
});
