const fitsLength = (text, maxLength) => text.length <= maxLength;

const isPalindrome = (sequence) => {
  const text = String(sequence).toLowerCase().replaceAll(' ', '');
  const reversedText = text.split('').reverse().join('');
  return text === reversedText;
};

const parseDigits = (sequence) => {
  const digits = String(sequence).replace(/[^0-9]+/g, '');
  return digits ? Number(digits) : NaN;

};

const getRandomInteger = (min, max) => {
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

const getRandomItem = (items) => {
  const index = getRandomInteger(0, items.length - 1);
  return items[index];
};

void (fitsLength,isPalindrome,parseDigits);

export {fitsLength, isPalindrome, parseDigits, getRandomInteger, getRandomItem};
