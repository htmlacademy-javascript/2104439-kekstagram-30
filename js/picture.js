import { COMMENTS_COUNTS_SHOW } from './constants.js';

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

let commentsCountShown = 0;
let comments = [];


//Создаем один комментарий
const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);

  const newCommentPicture = newComment.querySelector('.social__picture');
  newCommentPicture.src = avatar;
  newCommentPicture.alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

//Функция, отрисовывающая комментарии
const renderComments = () => {
  //показываем по 5 комментариев
  commentsCountShown += COMMENTS_COUNTS_SHOW;

  //скрываем кнопку, если отобразились все комментарии
  if (commentsCountShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    //показываем длину массива с комментариями
    commentsCountShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  //отрисовываем комментарии порционно
  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  //очищаем комментарии по умолчанию
  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);

  //Показываем колличество отображаемых комментариев
  commentCountElement.textContent = commentsCountShown;
  totalCommentCountElement.textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();

const hidePicture = () => {
  // Обнуляем переменную после закрытия страницы
  commentsCountShown = 0;
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  //Снимаем обработчик события после закрывания окна esc
  document.removeEventListener('keydown', onDocumentKeydown);
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
  comments = pictureData.comments;
  //Условие, проверяющее наличие комментария
  if (comments.length > 0) {
    renderComments();
  }

  renderPicture(pictureData);
};

//Закрываем фото (событие)
closePictureButtonElement.addEventListener('click', onClosePictureButtonClick);
//клик по кнопке (событие)
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);


export { showPicture };
