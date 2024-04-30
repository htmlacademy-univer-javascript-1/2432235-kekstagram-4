import {getRandomArrayElement, getRandomInteger} from './util.js';

/*

- comments - Количество комментариев к каждой фотографии — случайное число от 0 до 30.

{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}

У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.

avatar — это строка,img/avatar-{{случайное число от 1 до 6}}.svg.

— message —
Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

name +

*/

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Все отлично!',
  'Очень нравится эта фотография',
  'Хочу порекамендовать вам сайт <реклама>',
  '<3',
  'Ваааау',
  'Очень крутая фотка',
  'КРУТО',
];

//рандом
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

let comId = 0;

const createComment = () => ({
  id: comId++,
  avatar: `img/avatar${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement[MESSAGE],
  name: getRandomArrayElement[NAMES],
});

/*

id Это число от 1 до 25. Идентификаторы не должны повторяться.

url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

description, строка — описание фотографии. Описание придумайте самостоятельно.

likes Случайное число от 15 до 200.

*/

let publId = 0;

const createPublication = () => ({
  id: publId++,
  url: `photos/${this.id}.jpg`,
  description: getRandomArrayElement[DESCRIPTION],
  likes: getRandomInteger(15, 200),
  comment: Array.from({length: 4}, createComment),
});

const arrayPhotos = Array.from({length: 25 }, createPublication);

export {arrayPhotos};
