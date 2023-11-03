//Ищем элемент picture по id в шаблонах, + обращаемся к контенту
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture'); //класс у тега a в template

//ищем Контейнер для изображений от других пользователей
const container = document.querySelector('.pictures');

//Функция, создающая одну превью(миниатюру) для фотографии
const createPicture = ({ url, description, likes, comments }) => {
  //добавляем данные в шаблон
  //клонируем шаблон для одной миниатюры
  const picture = pictureTemplate.cloneNode(true);

  //наполняем одну миниатюру
  const pictureImage = picture.querySelector('.picture__img');
  pictureImage.src = url;
  pictureImage.alt = description;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;

  return picture;
};

//Генерируем миниатюры
const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const photo = createPicture(picture);
    fragment.append(photo);
  });

  //заполняем двадцатипятью элементами фрагмент
  container.append(fragment);
};

export { renderPictures };
