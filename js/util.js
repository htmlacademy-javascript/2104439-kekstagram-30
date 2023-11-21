import { REMOVE_MESSAGE_TIMEOUT } from './constants.js';

//Добавляем сообщение об ошибке загрузке данных с сервера
const errorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showErrorMessage = () => {
  //клонируем элемент
  const errorElement = errorMessageTemplate.cloneNode(true);
  //добавляем в документ
  document.body.append(errorElement);

  //автоматическое удаление сообщения об ошибке
  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

//Функция debounce для устранения дребезга:
function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

//Функция throttle для пропуска кадров:
/* function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}
*/


export { showErrorMessage, debounce };
