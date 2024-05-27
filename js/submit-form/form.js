import { closeModalOnEsc } from '../util.js';
import { addValidators } from './validation.js';
import { initEffects, removeEffect } from './effects.js';
import { sendUserPictures } from '../api.js';

const body = document.body;

const submitFormNode = document.querySelector('.img-upload__form');
const uploadOverlayNode = submitFormNode.querySelector('.img-upload__overlay');
const submitInputNode = submitFormNode.querySelector('.img-upload__input');
const submittedImageNode = submitFormNode.querySelector('.img-upload__preview img');
const sendButtonNode = submitFormNode.querySelector('.img-upload__submit');
const closeIconNode = submitFormNode.querySelector('.img-upload__cancel');


const effectPreviewNodes = submitFormNode.querySelectorAll('.effects__preview');

const imgUploadScale = submitFormNode.querySelector('.img-upload__scale');
const scaleValueNode = imgUploadScale.querySelector('.scale__control--value');
const scaleUpButtonNode = imgUploadScale.querySelector('.scale__control--bigger');
const scaleDownButtonNode = imgUploadScale.querySelector('.scale__control--smaller');

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const pristine = new Pristine(submitFormNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});
const changeScale = (sign) => {
  let scaleValue = parseFloat(scaleValueNode.value);
  scaleValue = Math.max(Zoom.MIN, Math.min(Zoom.MAX, scaleValue + sign * Zoom.STEP));
  scaleValueNode.value = `${scaleValue}%`;
  submittedImageNode.style.transform = `scale(${scaleValue / 100})`;
};
const onScaleUpButtonClick = () => changeScale(1);
const onScaleDownButtonClick = () => changeScale(-1);

const initForm = () => {
  initEffects();
  addValidators(pristine);

  submitFormNode.addEventListener('input', () => {
    sendButtonNode.disabled = !pristine.validate();
  });
  submitFormNode.addEventListener(('submit'), onsubmitFormSubmit);

  scaleUpButtonNode.addEventListener('click', onScaleUpButtonClick);
  scaleDownButtonNode.addEventListener('click', onScaleDownButtonClick);
};

const openUploadImageForm = () => {
  uploadOverlayNode.classList.remove('hidden');
  body.classList.add('modal-open');

  submitFormNode.querySelector('.effect-level').classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

const onChangeUploadInput = () => {
  const image = submitInputNode.files[0];
  if (!image) { return; }

  const imageFileObject = URL.createObjectURL(image);
  submittedImageNode.src = imageFileObject;
  effectPreviewNodes.forEach((effectPreviewNode) => {
    effectPreviewNode.style.backgroundImage = `url(${imageFileObject})`;
  });
  openUploadImageForm();
};

const closeUploadImageForm = () => {
  if(!document.querySelector('.error')){
    uploadOverlayNode.scrollTop = 0;
    uploadOverlayNode.classList.add('hidden');
    body.classList.remove('modal-open');
    submittedImageNode.style.transform = 'none';
    document.removeEventListener('keydown', onDocumentKeydown);
    submitFormNode.reset();
    pristine.reset();
    removeEffect();
  }
};

function onDocumentKeydown (event) {closeModalOnEsc(event, closeUploadImageForm);}

const onCloseIconClick = closeUploadImageForm;

async function onsubmitFormSubmit(event) {
  event.preventDefault();
  sendButtonNode.disabled = true;
  const isSuccessSubmit = await sendUserPictures(new FormData(submitFormNode));
  sendButtonNode.disabled = false;
  if (isSuccessSubmit) {
    uploadOverlayNode.style.zIndex = 0;
    closeUploadImageForm();
  } else {
    submitInputNode.value = '';
    uploadOverlayNode.style.zIndex = 0;
  }
}

submitInputNode.addEventListener('change', onChangeUploadInput);
closeIconNode.addEventListener('click', onCloseIconClick);


export { initForm };
