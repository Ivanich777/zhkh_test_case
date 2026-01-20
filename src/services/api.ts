import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 0,
  validateStatus: (status) => status >= 200 && status < 400,
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
