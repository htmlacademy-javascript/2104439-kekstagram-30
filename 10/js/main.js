import { createProfile } from './data.js';
import { renderGallery } from './gallery.js';
import { initUploadPhoto } from './upload-form.js';

renderGallery(createProfile());
initUploadPhoto();
