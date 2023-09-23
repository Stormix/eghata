import { FixType } from '@/types/utils';
import Axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from './config';
import storage from './storage';

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  const token = storage.getToken();
  if (config.headers) {
    console.log('AuthRequestInterceptor: setting headers', token);
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
  (error) => {
    const message = error.response?.data?.message || error.message;
    // TODO: display toast
    console.error(message);
    return Promise.reject(error);
  }
);
