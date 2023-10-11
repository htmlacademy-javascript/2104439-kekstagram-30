//Проверка длины строки
const isStringLengthValid = (text, count) => text.length <= count;

isStringLengthValid('проверяемая строка', 20);

//Палиндром с отражением строки

function checkStringPalindrome(string) {
  const stringNormal = string.toLowerCase().replaceAll(' ', '');
  let stringReverse = '';
  for (let i = stringNormal.length - 1; i >= 0; i--) {
    stringReverse += stringNormal[i];
  }
  return stringNormal === stringReverse;
}

checkStringPalindrome('Лёша на полке клопа нашёл ');

//Палиндром с делением строки на 2 части

function isPalindrome(rawString) {
  const string = rawString.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length / 2; i++) {
    if (string.at(i) !== string.at(-i - 1)) {
      return false;
    }
  }
  return true;
}

isPalindrome('топот');
isPalindrome('Лёша на полке клопа нашёл ');
isPalindrome('Кекс');

//Функция, возвращающая цифры из строки
function returnsNumbers(baseString) {
  const string = baseString.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}

returnsNumbers('2023 год'); // 2023
returnsNumbers('ECMAScript 2022'); // 2022
returnsNumbers('1 кефир, 0.5 батона'); // 105
returnsNumbers('агент 007'); // 7
returnsNumbers('а я томат'); // NaN
returnsNumbers(2023); // 2023
returnsNumbers(-1); // 1
returnsNumbers(1.5); // 15
