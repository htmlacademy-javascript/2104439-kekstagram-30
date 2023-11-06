import { initCommentList, renderComments } from './comments.js';

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const hidePicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  //Снимаем обработчик события после закрывания окна esc
  document.removeEventListener('keydown'.onDocumentKeydown);
};

const onClosePictureButtonClick = () => {
  hidePicture();
};

//Проверяем нажатие клавиши esc
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}


const renderPicture = ({ url, description, likes }) => {
  const bigPictureElementImage = bigPictureElement.querySelector('.big-picture__img img');
  bigPictureElementImage.src = url;
  bigPictureElementImage.alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

// Функция показа полного изображения
const showPicture = (pictureData) => {
  //убираем ненужный класс
  bigPictureElement.classList.remove('hidden');
  //Добавляем класс
  bodyElement.classList.add('modal-open');
  //закрываем фото клавишой esc
  document.addEventListener('keydown', onDocumentKeydown);

  //рендер комментариев
  renderComments(pictureData.comments);
  initCommentList();

  renderPicture(pictureData);
};

//Закрываем фото
closePictureButtonElement.addEventListener('click', onClosePictureButtonClick);

export { showPicture };
