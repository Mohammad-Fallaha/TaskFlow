import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_BASE_URL = 'http://192.168.1.109:5000/api';

const handleError = (error: any) => {
  if (error?.response?.status === 401) {
    console.error('Unauthorized - Token expired or missing');
  } else if (error?.response?.status === 403) {
    console.error('Forbidden');
  } else if (error?.response?.status === 500) {
    console.error('Internal Server Error');
  } else {
    console.error('API Error:', error);
  }

  return Promise.reject(error);
};


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});


axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // 🔥 Always get fresh token
        const token = await user.getIdToken();

        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers['Content-Type'] = 'application/json';

      return config;
    } catch (err) {
      console.error('Token Error:', err);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleError(error)
);

export default axiosInstance;