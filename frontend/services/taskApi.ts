import axiosInstance from '@/api/ApiBase';

export const getTasks = async () => {
  const res = await axiosInstance.get('/tasks');
  return res.data;
};
export const getTaskById = async (id: string) => {
  const res = await axiosInstance.get(`/tasks/${id}`);
  return res.data;
};

export const createTask = async (task: any) => {
  const res = await axiosInstance.post('/tasks', task);
  return res.data;
};

export const updateTask = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};