const { expect } = require('chai');
const { mergeStrings } = require('../src/helpers/merge-strings');

describe('Merge Strings', () => {
  it('should merge two strings - extras should be appened to end', () => {
    const string1 = 'abc';
    const string2 = 'stuvwx';
    const mergedString = mergeStrings(string1, string2);
    expect(mergedString).to.equal('asbtcuvwx');
  });

  it('should merge two strings - reverse order', () => {
    const string1 = 'stuvwx';
    const string2 = 'abc';
    const mergedString = mergeStrings(string1, string2);
    expect(mergedString).to.equal('satbucvwx');
  });
});
