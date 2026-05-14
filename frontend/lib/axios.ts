import { create } from 'axios';

const axiosInstance = create({
  baseURL: 'https://69fb7bb888a7af0ecca931cd.mockapi.io/api/v1', // ← هاد التغيير الوحيد
  timeout: 30000,
});

export default axiosInstance;