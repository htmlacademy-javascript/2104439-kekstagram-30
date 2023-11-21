//Задача: Отобразить фотографии других пользователей.
//Ищем элемент picture по id в шаблонах, + обращаемся к контенту
const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture'); //класс у тега a в template

//Функция, создающая одну превью(миниатюру) для фотографии
const createThumbnail = ({ url, description, likes, comments, id }) => {

  //добавляем данные в шаблон
  //клонируем шаблон для одной миниатюры
  const thumbnail = thumbnailTemplate.cloneNode(true);

  //наполняем одну миниатюру
  const imagePicture = thumbnail.querySelector('.picture__img');
  imagePicture.src = url;
  imagePicture.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

//Генерируем миниатюры
const renderThumbnails = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  //заполняем двадцатипятью элементами фрагмент
  container.append(fragment);
};

export { renderThumbnails };
