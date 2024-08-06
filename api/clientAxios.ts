'use client';
import { BASE_API_URL, BASE_URL } from '@/lib/constants';
import axios from 'axios';

const clientAxios = axios.create({
  baseURL: BASE_API_URL,
});

clientAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

clientAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 418 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${BASE_URL}/api/auth/refresh`, { refreshToken });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return clientAxios(originalRequest);
      } catch (refreshError) {
        //TODO: Handle refresh failure (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);

export default clientAxios;
