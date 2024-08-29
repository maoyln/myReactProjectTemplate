import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { Button, Input } from 'antd';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuthStore();

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      // 假设后端返回 token 和 role
      console.log(token);
      authLogin(token.role);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>登录</h1>
      <Input
        placeholder="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Input.Password
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Button type="primary" onClick={handleLogin}>
        登录
      </Button>
    </div>
  );
};

export default Login;
