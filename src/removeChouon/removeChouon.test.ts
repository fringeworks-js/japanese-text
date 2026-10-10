import removeChouon from './removeChouon';

describe('removeChouon', () => {
  it('長音記号を除去する', () => {
    expect(removeChouon('コーヒー')).toBe('コヒ');
  });

  it('ひらがなの長音記号も除去', () => {
    expect(removeChouon('あーい')).toBe('あい');
  });

  it('長音記号がない場合はそのまま', () => {
    expect(removeChouon('コーヒ'.replace('ー', ''))).toBe('コヒ');
  });

  it('空文字', () => {
    expect(removeChouon('')).toBe('');
  });

  it('連続した長音記号', () => {
    expect(removeChouon('カーーー')).toBe('カ');
  });
});
