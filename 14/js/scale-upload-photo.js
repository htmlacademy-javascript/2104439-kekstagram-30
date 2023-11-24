import { SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE } from './constants.js';

const modalElement = document.querySelector('.img-upload');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

//масштабируем картинки
const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`; //к scle подставляем значения
  scaleInputElement.value = `${value}%`;
};

//проверяем что значение не превышает миниум
const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleInputElement.value, 10) - SCALE_STEP, MIN_SCALE) //ограничиваем нижним порогом
  );
};

//проверяем что значение не превышает максимум
const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleInputElement.value, 10) + SCALE_STEP, MAX_SCALE) //смотрим какое значение было, добавляем шаг, ограничиваем верхним порогом
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

//Подписываемся а кнопки + и -
smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
