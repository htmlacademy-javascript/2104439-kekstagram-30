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

const DESCRIPTION = [
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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const photos = [];

const addImages = () => {
  for (let i = 0; i < SIMILAR_IMAGE_COUNT; i++) {
    photos.push({
      // число от 1 до 25
      id: i,
      // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
      url: 'photos/' + { i } + '.jpg',
      // число — количество лайков, поставленных фотографии. Случайное число от 15 до 200
      likes: getRandomInteger(15, 200),
      //кол-во от 0 до 30 (не поняла как сделать)
      comments: {
        // любое число. Идентификаторы не должны повторяться
        id: getRandomInteger(0, 1000),
        //это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img
        avatar: 'img/avatar - ' + { getRandomInteger(1, 6) } + '.svg',
        // одно или два случайных предложения из представленных
        message: getRandomArrayElement(COMMENTS), //как сделать или два?
        //Подставляйте случайное имя в поле name
        name: getRandomArrayElement(NAMES),
      },
      //строка — описание фотографии. Описание придумайте самостоятельно.
      description: getRandomArrayElement(DESCRIPTION),
    });
  }
};

const similarImages = Array.from({ length: SIMILAR_IMAGE_COUNT }, addImages);

console.log(similarImages);
