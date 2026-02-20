import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
);
