import '../../vendor/pristine/pristine.min';

const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const split = (text) => text.split(' ').filter(Boolean);

pristine.addValidator(form.hashtags, (text) => {
  const hashtagRegExp = /^#[a-zа-яё0-9]+$/i;
  return split(text).every((word) => hashtagRegExp.test(word));
}, 'введён невалидный хэш-тег', 1, true);

pristine.addValidator(form.hashtags, (text) => {
  const words = split(text.toLowerCase());
  return words.length === new Set(words).size;
}, 'хэш-теги повторяются', 1, true);

pristine.addValidator(form.hashtags, (text) => {
  const maxNumberOfHashtags = 5;
  return split(text).length <= maxNumberOfHashtags;
}, 'превышено максимальное количество хэш-тегов', 1, true);

pristine.addValidator(form.hashtags, (text) => {
  const maxHashtagsLength = 20;
  return split(text).every((word) => word.length <= maxHashtagsLength);
}, 'превышена длинна хеш-тега', 1, true);

pristine.addValidator(form.description, (text) => {
  const maxDescriptionLength = 140;
  return text.length <= maxDescriptionLength;
}, 'превышена длинна описания', 1, true);

const checkValidity = () => pristine.validate();

const resetValidity = () => pristine.reset();

export {checkValidity, resetValidity};
