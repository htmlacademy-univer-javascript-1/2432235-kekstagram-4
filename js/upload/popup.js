const popup = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

const onDocumentKeyDown = (event) => {
  if (event.key.startsWith('Esc') && (!event.target || !event.target.type || !event.target.type.startsWith('text'))) {
    closeButton.click();
  }
};

const openPopup = () => {
  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
};

const closePopup = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

closeButton.addEventListener('click', () => closePopup());

export {openPopup, closePopup};
