const COMMENTS_DISPLAY_LIMIT = 5;
const container = document.querySelector('.social__comments');
const shownCounter = document.querySelector('.social__comment-shown-count');
const totalCounter = document.querySelector('.social__comment-total-count');
const loaderButton = document.querySelector('.comments-loader');

const createComment = (commentsData) => commentsData.map((properties) => {
  const {avatar, name, message} = properties;
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
});

const currentCommentsData = [];
const onLoaderButtonClick = () => {
  container.append(...createComment(currentCommentsData.splice(0, COMMENTS_DISPLAY_LIMIT)));
  shownCounter.textContent = container.childElementCount;
  loaderButton.classList.toggle('hidden', !currentCommentsData.length);
};

const renderComments = (commentsData) => {
  currentCommentsData.splice(0, currentCommentsData.length, ...commentsData);
  container.replaceChildren();
  totalCounter.textContent = commentsData.length;
  loaderButton.addEventListener('click',onLoaderButtonClick);
  loaderButton.click();
};

export {renderComments};
