import axios from 'axios'
import { Toast } from 'vant';

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: '接口地址',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    });
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    Toast.clear();
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config) //返回一个Promise
}
