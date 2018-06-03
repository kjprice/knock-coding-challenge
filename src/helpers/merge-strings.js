function mergeStrings(string1, string2) {
  const shortestString = (string1.length <= string2.length ? string1 : string2);
  const longestString = (shortestString === string1 ? string2 : string1);
  const charactersLeftOver = longestString.substr(shortestString.length);

  const mergeStringArray = [];
  // iterate until all of the characters of the shortest string have been used
  for (let i = 0; i < shortestString.length; i += 1) {
    mergeStringArray.push(string1[i], string2[i]);
  }

  return mergeStringArray
    .concat(charactersLeftOver)
    .join('');
}

module.exports.mergeStrings = mergeStrings;
