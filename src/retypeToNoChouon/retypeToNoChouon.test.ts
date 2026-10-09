import retypeToNoChouon from './retypeToNoChouon';

describe('retypeToNoChouon', () => {
  it('長音記号を除去する', () => {
    expect(retypeToNoChouon('コーヒー')).toBe('コヒ');
  });

  it('ひらがなの長音記号も除去', () => {
    expect(retypeToNoChouon('あーい')).toBe('あい');
  });

  it('長音記号がない場合はそのまま', () => {
    expect(retypeToNoChouon('コーヒ'.replace('ー', ''))).toBe('コヒ');
  });

  it('空文字', () => {
    expect(retypeToNoChouon('')).toBe('');
  });

  it('連続した長音記号', () => {
    expect(retypeToNoChouon('カーーー')).toBe('カ');
  });
});
