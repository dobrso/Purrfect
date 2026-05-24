// src/api.js (полностью, с добавленными функциями)
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Добавляем токен
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обработка 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// ---------- Аутентификация ----------
export const register = async (userData) => {
  const response = await api.post('/auth/register/', userData);
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login/', credentials);
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// ---------- Профиль  ----------
export const updateProfile = async (profileData) => {
  const response = await api.patch('/auth/profile/', profileData);
  return response.data;
};

export const updateProfileLocal = (userData) => {
  const currentUser = getCurrentUser();
  const updatedUser = { ...currentUser, ...userData };
  localStorage.setItem('user', JSON.stringify(updatedUser));
  return updatedUser;
};

export const updateProfileAvatar = async (avatarFile) => {
  const token = localStorage.getItem('access_token');
  const formData = new FormData();
  formData.append('avatar', avatarFile);
  
  const response = await fetch('/api/auth/profile/', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`);
  }
  
  return response.json();
};
// ---------- Питомцы ----------
// src/api.js
export const getPets = async (ownerId) => {
  try {
    const response = await api.get(`/pets/owner/${ownerId}/`);
    // Логируем для проверки: console.log(response.data);
    // Если данные приходят как массив
    if (Array.isArray(response.data)) {
      return response.data;
    }
    // Если данные приходят в объекте с полем 'pets'
    if (response.data && Array.isArray(response.data.pets)) {
      return response.data.pets;
    }
    // Если данные приходят в объекте с полем 'results' (пагинация от DRF)
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results;
    }
    console.warn('Неизвестный формат ответа от API /pets/owner/:', response.data);
    return []; // В крайнем случае возвращаем пустой массив
  } catch (error) {
    console.error('Ошибка при загрузке питомцев:', error);
    return []; // Возвращаем пустой массив, чтобы избежать ошибки в компоненте
  }
};

export const addPet = async (petData) => {
  const response = await api.post('/pets/', petData);
  return response.data;
};

export const deletePet = async (petId) => {
  const response = await api.delete(`/pets/${petId}/`);
  return response.data;
};

// ---------- Распознавание породы ----------
export const recognizeBreed = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await api.post('/prediction/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export default api;