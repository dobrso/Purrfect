import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Добавляем access_token в заголовок Authorization, если он есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// При получении 401 (неавторизован) очищаем токены
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // Можно раскомментировать строку ниже, если нужно сразу отправлять на страницу входа
      // window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;