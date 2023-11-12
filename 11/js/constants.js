const SIMILAR_IMAGE_COUNT = 25;
const LikesCount = {
  MIN: 15,
  MAX: 200,
};
const CommentsCounts = {
  MIN: 0,
  MAX: 30,
};
const AvatarCount = {
  MIN: 1,
  MAX: 6,
};

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
  'Кокос'
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

const COMMENTS_COUNTS_SHOW = 5;

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштэгов`,
  NOT_UNIQUE: 'Хэштеги повторяются',
  INVALID_PATTERN: 'Неправильный хэштэг',
};

const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

export { SIMILAR_IMAGE_COUNT, LikesCount, CommentsCounts, AvatarCount, NAMES, COMMENTS, DESCRIPTIONS, COMMENTS_COUNTS_SHOW, MAX_HASHTAG_COUNT, VALID_SYMBOLS, ErrorText, Effect, effectToFilter, effectToSliderOptions };
