import { SERVER_URL, ServerRoute, HttpMethod, ErrorDates } from './constants.js';

//Функция для отправки сетевого запроса
const request = async (url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(ErrorDates[method]);
  }
  return response.json(); //преобразовали данные из строки в объект
};

//Функция для получения данных
const loadPictures = async () => request(SERVER_URL + ServerRoute.GET_DATA);


//Функция для отправки картинки
const sendPicture = async (pictureData) => request(
  SERVER_URL + ServerRoute.SEND_DATA,
  HttpMethod.POST,
  pictureData,
);

export { loadPictures, sendPicture };
