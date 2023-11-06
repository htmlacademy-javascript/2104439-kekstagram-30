import { renderPhotos } from './photos.js';
import { showPicture } from './picture.js';

// Задача: Реализовать сценарий просмотра фотографий в полноразмерном режиме.
const container = document.querySelector('.pictures');

//Функция, принимающая массив объектов с тестами данных
const renderGallery = (pictures) => {
  //прописываем события клика
  container.addEventListener('click', (evt) => {
    //проверка есть ли у элемента дата атрибут
    const photo = evt.target.closest('[data-photo-id]');

    //выходим из функции, если null
    if (!photo) {
      return;
    }

    //Если нашли, то отменяем действие браузера по умолчанию
    evt.preventDefault();

    //получаем значение дата атрибута + преобразовываем в число
    const photoId = +photo.dataset.photoId;
    //ищем выбранный элемент из массива (колбэк) и сравниваем id
    const pictureData = pictures.find(({ id }) => id === photoId);

    showPicture(pictureData);


  });

  renderPhotos(pictures, container);
};

export { renderGallery };
