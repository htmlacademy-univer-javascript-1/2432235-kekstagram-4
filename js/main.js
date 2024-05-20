import { getUserPictures } from './api.js';
import { createGallery } from './gallery/gallery.js';
import { initForm } from './submit-form/form.js';

async function init() {
  const pictures = await getUserPictures();
  createGallery(pictures);
  initForm();
}

init();
