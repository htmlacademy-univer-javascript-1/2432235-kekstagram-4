import { closeModalOnEsc } from './util.js';

const body = document.body;
const errorTemplate = body.querySelector('#error').content.querySelector('.message__modal');
const successTemplate = body.querySelector('#success').content.querySelector('.message__modal');

const onDocumentKeydown = (event) => closeModalOnEsc(event, closeModal);

const onModalButtonClick = () => closeModal();

const onModalClick = (event) => {
  if (event.target.className.includes('message__modal')) {
    closeModal();
  }
};

function closeModal() {
  const modalNode = document.querySelector('.message__modal');
  modalNode.querySelector('.message__button').removeEventListener('click', onModalButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  modalNode.remove();
}

const showMessage = (template) => {
  const modal = template.cloneNode(true);

  body.append(modal);

  const closeButtonNode = modal.querySelector('.message__button');
  body.querySelector('.message__modal').addEventListener('click', onModalClick);

  closeButtonNode.addEventListener('click', onModalButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showError = (title, buttonText = null) => {
  const template = errorTemplate;
  const closeButtonNode = errorTemplate.querySelector('.message__button');
  errorTemplate.querySelector('.error__title').textContent = title;
  if (buttonText) {
    closeButtonNode.textContent = buttonText;
  }
  showMessage(template);
};

const showSuccess = () => showMessage(successTemplate);

export { showError, showSuccess };
