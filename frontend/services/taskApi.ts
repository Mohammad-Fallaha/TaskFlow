import axiosInstance from '@/api/ApiBase';

export const getTasks = async () => {
  const response = await axiosInstance.get('/tasks');
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await axiosInstance.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await axiosInstance.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};