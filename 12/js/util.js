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

export { showErrorMessage };
