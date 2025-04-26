import api from './axios';

const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export const authService = { register, login };
