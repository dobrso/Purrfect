// src/services/api.js

const API_BASE_URL = 'http://127.0.0.1:8000/api/users/';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = data?.detail || data?.message || Object.values(data)[0]?.[0] || 'Ошибка сервера';
    return Promise.reject(error);
  }
  return data;
};

// Регистрация
export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await handleResponse(response);
  
  if (data.access) {
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
  }
  return data;
};

// Вход (login)
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await handleResponse(response);
  
  if (data.access) {
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
  }
  return data;
};

// Выход (logout)
export const logout = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    await fetch(`${API_BASE_URL}logout/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log('Ошибка при выходе', error);
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Получение текущего пользователя из токена
export const getCurrentUser = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return Promise.reject('Нет токена');
  
  // Так как нет отдельного эндпоинта /user/, 
  // мы можем расшифровать токен или вернуть данные из localStorage
  // Пока сделаем заглушку, но ты можешь попросить бекендеров добавить эндпоинт /user/
  return Promise.reject('Эндпоинт /user/ пока не реализован. Нужно добавить на бекенде.');
};