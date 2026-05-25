const API_BASE_URL = 'http://127.0.0.1:8000/api';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = data?.detail || data?.message || 'Ошибка';
    return Promise.reject(error);
  }
  return data;
};
// Получение данных текущего пользователя
export const getCurrentUser = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/users/me/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};
// Регистрация
export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await handleResponse(response);
  if (data.access) localStorage.setItem('accessToken', data.access);
  return data;
};

// Вход
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await handleResponse(response);
  if (data.access) localStorage.setItem('accessToken', data.access);
  return data;
};

// Выход
export const logout = async () => {
  localStorage.removeItem('accessToken');
};

// Получение статей
export const getArticles = async () => {
  const response = await fetch(`${API_BASE_URL}/articles/`);
  return handleResponse(response);
};

// Распознавание породы по фото
export const recognizeBreed = async (imageFile) => {
  const token = localStorage.getItem('accessToken');
  
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch(`${API_BASE_URL}/breed/recognize/`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });
  
  return handleResponse(response);
};