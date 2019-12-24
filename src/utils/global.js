import axios from 'axios';
import AsyncStorge from '@react-native-community/async-storage';
import { getLoginUser } from './api';

let token = '';
getLoginUser().then(res => token = res);

const service = axios.create({
  //baseURL: 'http://172.16.41.88:8080',
  baseURL: "http://localhost:3000",
  //withCredentials: true,
  timeout: 3000,
});
/**
 * @description: 除了登录以外所有接口都需要token
 * @name: Fangyiming
 * @Date: 2019-12-16 00:54:54
 */
service.interceptors.request.use(
  config => {
    if (config.url !== '/login') {
      config.headers.token = token;
    }
    console.log(config);
    return config;
  },
  error => {
    console.log(error);
  },
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);
const get = (url, params) => {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, params).then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export { get, post };
