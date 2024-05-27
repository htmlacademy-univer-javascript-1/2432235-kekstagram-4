import { fillFragment } from '../util.js';

const COMMENTS_PER_LOAD = 5;

const commentTemplate = document.querySelector('.social__comment');

const bigPictureSocial = document.querySelector('.big-picture__social');
const commentsContainerNode = bigPictureSocial.querySelector('.social__comments');
const currentCommentsCountNode = bigPictureSocial.querySelector('.loaded-comments-count');
const loadCommentsButtonNode = bigPictureSocial.querySelector('.social__comments-loader');

let comments = [];
let endCommentNumber = 0;

const changeVisibleCommentsCount = (current) => {
  currentCommentsCountNode.textContent = current;
};

const hideLoadCommentsButton = () => loadCommentsButtonNode.classList.add('hidden');

const showLoadCommentsButton = () => loadCommentsButtonNode.classList.remove('hidden');

const resetCommentData = () => {
  endCommentNumber = 0;
  comments = [];
  loadCommentsButtonNode.removeEventListener('click', renderComments);
};

const createCommentNode = ({ avatar, message, name }) => {
  const commentNode = commentTemplate.cloneNode(true);
  const commentPictureNode = commentNode.querySelector('.social__picture');
  commentPictureNode.src = avatar;
  commentPictureNode.alt = name;
  commentNode.querySelector('.social__text').textContent = message;
  return commentNode;
};

const getComments = () => {
  const commentsToShow = comments.slice(endCommentNumber, endCommentNumber + COMMENTS_PER_LOAD);
  endCommentNumber += commentsToShow.length;
  return commentsToShow;
};

const addComments = (currentComments) => {
  const commentsFragment = fillFragment(currentComments, createCommentNode);
  commentsContainerNode.append(commentsFragment);
};

function renderComments() {
  const commentsToShow = getComments();
  addComments(commentsToShow);
  changeVisibleCommentsCount(endCommentNumber);
  showLoadCommentsButton();

  if (comments.length - endCommentNumber === 0) {
    hideLoadCommentsButton();
    resetCommentData();
  }
}

const onLoadCommentsButtonClick = renderComments;

const showComments = (newComments) => {
  commentsContainerNode.innerHTML = '';
  comments = newComments;
  renderComments();
  loadCommentsButtonNode.addEventListener('click', onLoadCommentsButtonClick);
};

export { showComments, resetCommentData };
