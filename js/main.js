import { renderGallery } from './gallery.js';
import { initUploadPhoto } from './upload-form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initUploadPhoto();
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();
