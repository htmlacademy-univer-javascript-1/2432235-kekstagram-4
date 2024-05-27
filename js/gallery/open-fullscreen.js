import { showComments, resetCommentData } from './comments.js';
import { closeModalOnEsc } from '../util.js';

const closeButtonNode = document.getElementById('picture-cancel');
const modalNode = document.querySelector('.big-picture');
const body = document.body;

const onCloseIconClick = closeFullscreen;
const onDocumentKeydown = (event) => closeModalOnEsc(event, closeFullscreen);

function closeFullscreen() {
  resetCommentData();

  modalNode.scrollTop = 0;
  modalNode.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonNode.removeEventListener('click', onCloseIconClick);
}

const openFullscreen = ({ url, description, likes, comments }) => {
  modalNode.querySelector('.big-picture__img').children[0].src = url;
  modalNode.querySelector('.social__caption').textContent = description;
  modalNode.querySelector('.likes-count').textContent = likes;
  modalNode.querySelector('.comments-count').textContent = comments.length;

  showComments(comments);
  modalNode.classList.remove('hidden');

  body.classList.add('modal-open');
  closeButtonNode.addEventListener('click', onCloseIconClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openFullscreen };
