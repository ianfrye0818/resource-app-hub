'use client';
import { refreshTokens } from '@/actions/auth-actions';
import axios from 'axios';
let retries = 0;
let MAX_API_RETIES = 2;

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && retries < MAX_API_RETIES) {
      retries++;
      try {
        await refreshTokens();
        retries = 0;
        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error(['refreshing token interceptor'], refreshError);
        // TODO: Implement a logout function here, e.g., redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
