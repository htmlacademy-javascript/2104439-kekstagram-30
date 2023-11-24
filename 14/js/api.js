import { SERVER_URL, ServerRoute, HttpMethod, ErrorData } from './constants.js';

//Функция для отправки сетевого запроса
const request = async (url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(ErrorData[method]);
  }
  return response.json(); //преобразовали данные из строки в объект
};

//Функция для получения данных
const getData = async () => request(SERVER_URL + ServerRoute.GET_DATA);


//Функция для отправки картинки
const sendData = async (photos) => request(
  SERVER_URL + ServerRoute.SEND_DATA,
  HttpMethod.POST,
  photos,
);

export { getData, sendData };
