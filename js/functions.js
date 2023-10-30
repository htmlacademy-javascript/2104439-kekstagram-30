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

//Функция делу время

function getMinutes(data) {
  const getTime = data.split(':'); //делим двоеточием
  const convertHoursToMinutes = (parseInt(getTime[0], 10)) * 60; //превращаем часы в минуты
  const minutes = parseInt(getTime[1], 10); //минуты
  return convertHoursToMinutes + minutes; //складываем
}

function meetNotWorkingDay(startWork, finishWork, meet, meetDuration) {
  const startWorkMinutes = getMinutes(startWork);
  const finishWorkMinutes = getMinutes(finishWork);
  const startMeetMinutes = getMinutes(meet);
  const finishMeet = startMeetMinutes + meetDuration;
  return startMeetMinutes >= startWorkMinutes && finishMeet <= finishWorkMinutes;
}

meetNotWorkingDay('08:00', '17:30', '14:00', 90); // true
meetNotWorkingDay('8:0', '10:0', '8:0', 120); // true
meetNotWorkingDay('08:00', '14:30', '14:00', 90); // false
meetNotWorkingDay('14:00', '17:30', '08:0', 90); // false
meetNotWorkingDay('8:00', '17:30', '08:00', 900); // false
