function checkStringPalindrome(string) {
  const stringNormal = string.toLowerCase().replaceAll(' ', '');
  let stringReverse = '';

  for (let i = stringNormal.length - 1; i >= 0; i--) {
    stringReverse += stringNormal[i];
  }
  return stringNormal === stringReverse;
}
checkStringPalindrome('Лёша на полке клопа нашёл ');