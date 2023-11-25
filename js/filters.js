import { FilterGroup, MAX_RANDOM_FILTER } from './constants';
import { renderThumbnails } from './thumbnail.js';
import { debounce } from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filterFormElement = document.querySelector('.img-filters__form');
const filterButtons = filterFormElement.querySelectorAll('button');
const pictureContainerElement = document.querySelector('.pictures');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [FilterGroup.DEFAULT]: (data) => data,

  [FilterGroup.RANDOM]: (data) => {
    const randomIndexLists = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexLists.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexLists.includes(index)) {
        randomIndexLists.push(index);
      }
    }
    return randomIndexLists.map((index) => data[index]);
  },

  [FilterGroup.DISCUSSED]: (data) => [...data].sort((a, b) => b.comments.length - a.comments.length)
};

let currentFilter = FilterGroup.DEFAULT;

//функция отрисовки отфильтрованных данных

const repaint = (filter, data) => {
  if (currentFilter !== filter) {
    const filteredData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderThumbnails(filteredData, pictureContainerElement);
    currentFilter = filter;
  }
};

const debouncedRepaint = debounce(repaint);

const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const currentActiveElement = filterFormElement.querySelector('.img-filters__button--active');
      currentActiveElement.classList.remove('img-filters__button--active');
      event.target.classList.add('img-filters__button--active');
      debouncedRepaint(event.target.id, data);
    });
  });
};

export { initFilter };
