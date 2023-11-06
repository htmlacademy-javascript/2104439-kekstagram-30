//Задача: Отобразить фотографии других пользователей.
//Ищем элемент picture по id в шаблонах, + обращаемся к контенту
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture'); //класс у тега a в template

//Функция, создающая одну превью(миниатюру) для фотографии
const createPhoto = ({ url, description, likes, comments, id }) => {

  //добавляем данные в шаблон
  //клонируем шаблон для одной миниатюры
  const photo = photoTemplate.cloneNode(true);

  //наполняем одну миниатюру
  const photoImage = photo.querySelector('.picture__img');
  photoImage.src = url;
  photoImage.alt = description;
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.dataset.photoId = id;

  return photo;
};

//Генерируем миниатюры
const renderPhotos = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const photo = createPhoto(picture);
    fragment.append(photo);
  });

  //заполняем двадцатипятью элементами фрагмент
  container.append(fragment);
  container.addEventListener('click', renderPhotos);
};

export { renderPhotos };
