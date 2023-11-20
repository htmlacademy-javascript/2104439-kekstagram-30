import { Effect, effectToFilter, effectToSliderOptions } from './constants.js';


const modalElement = document.querySelector('.img-upload'); //модалка
const previewElement = modalElement.querySelector('.img-upload__preview img');
const effectsElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const effectLevelElement = modalElement.querySelector('.effect-level__value');

//Начальные значения
let chosenEffect = Effect.DEFAULT;

//Определяем эффект по умолчанию
const isDefault = () => chosenEffect === Effect.DEFAULT;

//Подставляем стиль в наш элемент (из ключей)
const setImageStyle = () => {
  if (isDefault()) {
    previewElement.computedStyleMap.filter = null;
    return;
  }

  //Меняем значение по умолчанию
  const { value } = effectLevelElement;
  const { style, unit } = effectToFilter[chosenEffect];
  previewElement.style.filter = `${style}(${value}${unit})`; //присвоили стиль с помощью трех частей свойства filter
};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

//скрываем контейнер вместо слайдера
const closeSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get(); //из слайдера получем текущее значение ползунка
  setImageStyle();
};

//подставляем значение по умолчанию у ползунка слайдера
const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, { //элемент, в который будем подставлять занчение
    range: { min, max }, //указываем конфигурацию
    step,
    start: max, //старуем с максимального эфекта
    connect: 'lower', //значение слева на право
    format: { //преобразовываем значение из строки в число
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  //обработчик событий
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  closeSlider();
};

//делаем обновление конфигурации слайдера
const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

//устанавливаем эффект
const setSlider = () => {
  if (isDefault()) {
    closeSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

//сбрасываем эффект
const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

//функция, устанавливающая эффект по умолчанию
const reset = () => {
  setEffect(Effect.DEFAULT);
};

//инициализируем весь код при загрузке фотографии
const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]); //создаем слайдер для дальнейшей конфигурации
  effectsElement.addEventListener('change', onEffectChange); //устанавливается при переключении эффекта
};

export { init, reset };

