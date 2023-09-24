import { FixType } from '@/types/utils';
import Axios, { AxiosRequestConfig } from 'axios';
import api from './api';
import { API_URL } from './config';
import storage from './storage';

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  const token = storage.getToken();
  console.log('AuthRequestInterceptor: token', token);
  if (config.headers) {
    if (token) config.headers.authentication = `Bearer ${token}`;
    config.headers.Accept = 'application/json';
  }
  return config;
};

export const axios = Axios.create({
  baseURL: API_URL
});

axios.interceptors.request.use(authRequestInterceptor as FixType);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('Refreshing token...');
      originalRequest._retry = true;
      const response = await api.authenticate(storage.getFingerprint());
      const access_token = response?.token?.token;
      if (!access_token) return Promise.reject(error);
      storage.setToken(access_token);
      return axios(originalRequest);
    }

    const message = error.response?.data?.message || error.message;
    // TODO: display toast
    console.error(message);
    return Promise.reject(error);
  }
);
