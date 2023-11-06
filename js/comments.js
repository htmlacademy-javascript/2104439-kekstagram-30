const bigPictureElement = document.querySelector('.big-picture');

const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

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
const renderComments = (comments) => {
  //очищаем комментарии по умолчанию
  commentsListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentsListElement.append(fragment);
};

//Скрываем комментарии
const initCommentList = () => {
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

export { renderComments, initCommentList };
