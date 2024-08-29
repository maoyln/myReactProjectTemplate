import axios from 'axios';

export const login = async (username: string, password: string) => {
  // const response = await axios.post('/api/login', { username, password });
  const response: {role: string; message?: string} = await new Promise((resolve, reject) => {
    // 模拟异步延迟，通常这代表网络请求的时间
    setTimeout(() => {
      // 假设的登录逻辑：用户名为 'admin' 密码为 '123456' 才算成功
      if (username === 'admin' && password === '123456') {
        resolve({ role: 'admin' });
      } else {
        resolve({ role: '', message: 'Invalid username or password.' });
      }
    }, 1000); // 模拟网络延迟1秒
  })
  return response;
};

export const fetchUserRole = async (token: string) => {
  const response = await axios.get('/api/user-role', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
