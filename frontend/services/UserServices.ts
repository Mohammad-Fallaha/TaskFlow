import Api from '@/api/ApiBase';

export const loginUser = async (payload: any) => {
  return await Api.post('/auth/login', payload);
};

export const logoutUser = async () => {
  return await Api.get('/auth/logout');
};
export const getCurrentUser = async () => {
  return await Api.get('/users/me');
};

export const updateCurrentUser = async (data: any) => {
  return await Api.put('/users/me', data);
};

export const deleteCurrentUser = async () => {
  return await Api.delete('/users/me');
};

// ─── Users ───────────────────────────────────────────
export const getUserById = async (userId: string) => {
  return await Api.get(`/users/${userId}`);
};

export const addUser = async (data: any) => {
  return await Api.post('/users', data);
};