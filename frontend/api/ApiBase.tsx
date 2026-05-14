import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api';

const handleError = (error: any) => {
  if (error?.response?.status === 401) {
    console.error('Unauthorized');
  } else if (error?.response?.status === 403) {
    console.error('Forbidden');
  } else if (error?.response?.status === 500) {
    console.error('Internal Server Error');
  } else {
    console.error(error);
  }

  return Promise.reject(error);
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    return handleError(error);
  }
);

export default axiosInstance;