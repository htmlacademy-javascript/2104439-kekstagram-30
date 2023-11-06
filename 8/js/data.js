import { getRandomInteger, getRandomArrayElement } from './util.js';
import { SIMILAR_IMAGE_COUNT, LikesCount, CommentsCounts, AvatarCount, NAMES, COMMENTS, DESCRIPTIONS } from './constants.js';

const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENTS),
).join(' ');

//Генерация случайного числа айдишника
const generateId = () => {
  let lastId = 1;

  return () => lastId++;
};

const getCommentId = generateId();

const generateComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(AvatarCount.MIN, AvatarCount.MAX)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createProfile = () => {
  const photos = [];
  for (let i = 1; i <= SIMILAR_IMAGE_COUNT; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      likes: getRandomInteger(LikesCount.MIN, LikesCount.MAX),
      comments: Array.from({ length: getRandomInteger(CommentsCounts.MIN, CommentsCounts.MAX) }, generateComment),
      description: getRandomArrayElement(DESCRIPTIONS),
    });
  }
  return photos;
};

export { createProfile };
