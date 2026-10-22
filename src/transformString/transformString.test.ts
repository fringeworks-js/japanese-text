import { TransformationType } from './constants';
import transformString from './transformString';

describe('transformString', () => {
  it('空文字はそのまま返す', () => {
    expect(transformString('', [TransformationType.toLowerCase])).toBe('');
  });

  it('関数変換: toLowerCase', () => {
    expect(
      transformString('Hello World', [TransformationType.toLowerCase]),
    ).toBe('hello world');
  });

  it('関数変換: ケース', () => {
    expect(transformString('helloWorld', [TransformationType.toDotCase])).toBe(
      'hello.world',
    );
    expect(transformString('helloWorld', [TransformationType.toFlatCase])).toBe(
      'helloworld',
    );
    expect(
      transformString('helloWorld', [TransformationType.toSentenceCase]),
    ).toBe('Hello world');
    expect(
      transformString('helloWorld', [TransformationType.toTrainCase]),
    ).toBe('Hello-World');
  });

  it('テーブル変換: toHiragana', () => {
    expect(transformString('アイウ', [TransformationType.toHiragana])).toBe(
      'あいう',
    );
  });

  it('複数の変換を順に適用する', () => {
    expect(
      transformString('アイウ', [
        TransformationType.toHiragana,
        TransformationType.toLowerCase,
      ]),
    ).toBe('あいう');
  });

  describe('composeTables', () => {
    it('mapをため込んで最後にまとめて適用する', () => {
      const result = transformString(
        'アイウ',
        [TransformationType.toHiragana, TransformationType.toHiragana],
        { composeTables: true },
      );
      expect(result).toBe('あいう');
    });

    it('関数変換の前にため込んだmapをフラッシュする', () => {
      const result = transformString(
        'アイウ',
        [TransformationType.toHiragana, TransformationType.toLowerCase],
        { composeTables: true },
      );
      expect(result).toBe('あいう');
    });

    it('まとめたテーブルは指定した順番で後の変換が優先される', () => {
      const options = { composeTables: true };
      expect(
        transformString(
          'a b',
          [
            TransformationType.removeSpaces,
            TransformationType.toFullWidthSpace,
          ],
          options,
        ),
      ).toBe('a　b');
      expect(
        transformString(
          'a b',
          [
            TransformationType.toFullWidthSpace,
            TransformationType.removeSpaces,
          ],
          options,
        ),
      ).toBe('ab');
    });
  });

  it('readonly の配列を渡せる', () => {
    const types = [TransformationType.toHiragana] as const;
    expect(transformString('アイウ', types)).toBe('あいう');
  });
});
