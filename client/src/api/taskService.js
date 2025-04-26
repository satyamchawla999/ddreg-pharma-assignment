import api from './axios';

const createTask = async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

const getTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

const listTasks = async (sortBy = '', order = '') => {
  const params = new URLSearchParams();
  if (sortBy) params.append('sortBy', sortBy);
  if (order) params.append('order', order);

  const response = await api.get(`/tasks?${params.toString()}`);
  return response.data;
}

const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};

const getAnalytics = async () => {
  const response = await api.get('/tasks/analytics/summary');
  return response.data;
};

export const taskService = { createTask, getTask, listTasks, updateTask, deleteTask, getAnalytics };
