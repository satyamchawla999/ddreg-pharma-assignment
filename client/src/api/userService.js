import api from './axios';

const profileInfo = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const userService = { profileInfo };
