import api from './axios';

const createTask = async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

const listTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};



export const taskService = { createTask, listTasks, updateTask, deleteTask };
