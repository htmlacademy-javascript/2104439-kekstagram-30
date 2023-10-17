import { getRandomInteger, getRandomArrayElement } from './util.js';

const NAMES = [
  'Бублик',
  'Кекс',
  'Арчи',
  'Оливка',
  'Марс',
  'Чипс',
  'Маффин',
  'Карамель',
  'Маффин',
  'Карамель'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Хорошее настроение',
  'Красиво без фильтов',
  'Фотосессия - всегда хорошая идея',
  'Жду ваших лайков',
  'Гармония цвета',
  'Горизонт завален, но это задумка такая',
  'Фотография на память',
  'Живые фото',
  'Фотка на 15 айфон'
];

const SIMILAR_IMAGE_COUNT = 25;

const CommentsCount = {
  MIN: 0,
  MAX: 30
};

const LikesCount = {
  MIN: 15,
  MAX: 200
};

const AvatarCount = {
  MIN: 1,
  MAX: 6
};

const generateId = () => {
  let lastId = 1;

  return () => lastId++;
};

const getCommentId = generateId();

const generateComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(AvatarCount.MIN, AvatarCount.MAX)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const addImages = () => {
  const photos = [];
  for (let i = 1; i <= SIMILAR_IMAGE_COUNT; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      likes: getRandomInteger(LikesCount.MIN, LikesCount.MAX),
      comments: Array.from({ length: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX) }, generateComment),
      description: getRandomArrayElement(DESCRIPTIONS),
    });
  }
  return photos;
};

const similarImages = Array.from({ length: SIMILAR_IMAGE_COUNT }, addImages);

export { addImages };
