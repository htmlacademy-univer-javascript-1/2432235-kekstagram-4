
import {renderThumbnails} from './thumbnail.js';
import {renderPopup} from './popup.js';

const setupImageGallery = (imagesData) => {
  renderThumbnails(imagesData);

  document.addEventListener('thumbnailSelect', (event) => {
    renderPopup(event.detail);
  });
};
export {setupImageGallery};
