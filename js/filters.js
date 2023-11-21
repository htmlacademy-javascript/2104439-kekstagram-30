import { FilterEnum, MAX_RANDOM_FILTER } from './constants';
import { renderThumbnails } from './thumbnail.js';
import { debounce } from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');
const pictureContainerElement = document.querySelector('.pictures');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,

  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },

  [FilterEnum.DISCUSSED]: (data) => [...data].sort((a, b) => b.comments.length - a.comments.length)
};

let currentFilter = FilterEnum.DEFAULT;

const repaint = (event, filter, data) => {
  if (currentFilter !== filter) {
    const filteredData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderThumbnails(filteredData, pictureContainerElement);
    const currentActiveElement = filterForm.querySelector('.img-filters__button--active');
    currentActiveElement.classList.remove('img-filters__button--active');
    event.target.classList.add('img-filters__button--active');
    currentFilter = filter;
  }
};

const debouncedRepaint = debounce(repaint);

const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (event) => {
    debouncedRepaint(event, FilterEnum.DEFAULT, data);
  });
  randomButton.addEventListener('click', (event) => {
    debouncedRepaint(event, FilterEnum.RANDOM, data);
  });
  discussedButton.addEventListener('click', (event) => {
    debouncedRepaint(event, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
