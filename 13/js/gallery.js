import { renderThumbnails } from './thumbnail.js';
import { showPicture } from './picture.js';

// Задача: Реализовать сценарий просмотра фотографий в полноразмерном режиме.
const container = document.querySelector('.pictures');

//Функция, принимающая массив объектов с тестами данных
const renderGallery = (pictures) => {
  //прописываем события клика
  container.addEventListener('click', (evt) => {
    //проверка есть ли у элемента дата атрибут
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    //выходим из функции, если null
    if (!thumbnail) {
      return;
    }

    //Если нашли, то отменяем действие браузера по умолчанию
    evt.preventDefault();

    //получаем значение дата атрибута + преобразовываем в число
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    //ищем выбранный элемент из массива (колбэк) и сравниваем id
    const pictureData = pictures.find(({ id }) => id === thumbnailId);

    showPicture(pictureData);


  });

  renderThumbnails(pictures, container);
};

export { renderGallery };
