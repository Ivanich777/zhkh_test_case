import axios from 'axios';

const BASE_URL = 'http://showroom.eis24.me/c300/api/v4/test';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Ошибка запроса';
    return Promise.reject({
      message,
      status: error.response?.status,
    });
  }
);
