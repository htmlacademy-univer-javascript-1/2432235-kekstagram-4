import {getRandomInteger, getRandomItem} from './utilities.js';
const createCommentsData = (itemCount) => {
  const message = [
    'Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const name = [
    'matvey', 'nikitka', 'cry', 'fottbic', 'kiri4', 'jkkbkbk', 'jjbb',
    'sdhefufjk', 'nikneim', 'privet', 'pogba', 'dzuba', 'gogol', 'golovin', 'kirik',
    'uufcfj', 'namer'
  ];

  return new Array(itemCount).fill(1).map((start,index) => ({
    id: start + index,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomItem(message),
    name: getRandomItem(name)
  }));
};

const createImagesData = (itemCount = 25) => {

  const description = [
    'Одна хорошая мысль утром меняет смысл целого дня.',
    'Что бы ни случилось завтра, у нас есть еще сегодня.',
    'Настойчивость окупается сполна. Будь голосом, а не эхом.'
  ];

  return new Array(itemCount).fill(1).map((start,index) => ({
    id: start + index,
    url: `photos/${start + index}.jpg`,
    description: getRandomItem(description),
    likes: getRandomInteger(15, 200),
    comments: createCommentsData(getRandomInteger(0, 30))
  }));
};

export {createImagesData};
