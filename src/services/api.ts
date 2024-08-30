import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // 设置基础 API 路径
  timeout: 5000,    // 请求超时设置
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 处理 401 未授权错误
    if (error.response?.status === 401) {
      // 例如：重定向到登录页面
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
