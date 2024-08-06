import { BASE_URL } from '@/lib/constants';
import { AuthTokens } from '@/lib/types';
import axios from 'axios';
import { cookies } from 'next/headers';

export const createServerAxios = (cookieStore: ReturnType<typeof cookies>) => {
  const serverAxios = axios.create({
    baseURL: process.env.BACKEND_URL,
  });

  serverAxios.interceptors.request.use((config) => {
    if (cookieStore) {
      const token = cookieStore.get('accessToken')?.value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  serverAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 418 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = cookieStore?.get('refreshToken')?.value;
          const response = await axios.post<AuthTokens>(`${BASE_URL}/api/auth/refresh`, {
            refreshToken,
          });
          const { accessToken } = response.data;

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return serverAxios(originalRequest);
        } catch (refreshError) {
          //TODO: Handle refresh failure (e.g., redirect to login)
        }
      }
      return Promise.reject(error);
    }
  );

  return serverAxios;
};
