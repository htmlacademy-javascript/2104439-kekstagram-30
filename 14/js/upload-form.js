import { MAX_HASHTAG_COUNT, VALID_SYMBOLS, ErrorText, SubmitButtonCaption, FILE_TYPES } from './constants.js';
import {
  init as initEffect,
  reset as resetEffects
} from './effects-upload-form.js';
import { resetScale } from './scale-upload-photo.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelForm = uploadForm.querySelector('#upload-cancel');
const fileInput = uploadForm.querySelector('#upload-file');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const photoPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? SubmitButtonCaption.SUBMITTING //Изменяем значение кнопки (можно условием)
    : SubmitButtonCaption.IDLE;
};

//Подключаем библиотеку
const pristine = new window.Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//Открываем окно с формой после загрузки изображения
const showUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown); //обработчик закрытия окна на всю форму (для работы esc)
};

//Закрываем окно загрузки
const closeUploadForm = () => {
  uploadForm.reset(); //сбрасываем все значения формы
  resetEffects();
  resetScale();
  pristine.reset(); //отвязываем пристин, отвязка событий
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown); //отвязываем для избежания утечки памяти
};

//Правило: когда есть фокус на инпуте не работает esc
const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

//Нормализация тега. Правило: Может быть любое кол-во тегов
const normalizeTags = (tagString) => tagString
  .trim() //убираем пробелы по краям
  .split(' ') //делим объект на массив (включая лишние проблемы между тегами)
  .filter((tag) => Boolean(tag.length)); //фильтруем пустые строки, которые при обработке функции дадут true, т.е. НЕ ПУСТЫЕ. Удаляем проблемы

//Задаем валидные символы хэштэгам
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

//Проверяем имя файла (расширение)
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

//Ограничиваем кол-во тегов числом 5
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

//Проверяем уникальность тэга
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase()); //привели теги к одному регистру [#Tag, #tag] => [#tag, #tag]
  return lowerCaseTags.length === new Set(lowerCaseTags).size; //сравниваем длину массива с размером сэта и получается [#tag]
};

const isErrorMessageExist = () => Boolean(document.querySelector('.error'));

//Закрываем окно
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExist()) {
    evt.preventDefault();
    closeUploadForm();
  }
}
//Обработчики событий
const onCancelButtonClick = () => {
  closeUploadForm();
};

//нажать кнопку загрузить изображение
const onFileInputChange = () => {
  const file = fileInput.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  showUploadForm();
};

const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendData(new FormData(formElement));
    closeUploadForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

//Валидаторы
pristine.addValidator(
  hashtagInput,
  hasValidCount,
  ErrorText.INVALID_COUNT, //выводим сообщение из константы
  3, //очередь проверки (третья). Не проводится, если первая и вторая не валидны
  true
);

pristine.addValidator(
  hashtagInput,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagInput,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

//события
const initUploadPhoto = () => {
  fileInput.addEventListener('change', onFileInputChange);
  cancelForm.addEventListener('click', onCancelButtonClick);
  uploadForm.addEventListener('submit', onFormSubmit);
  initEffect();
};

export { initUploadPhoto };
