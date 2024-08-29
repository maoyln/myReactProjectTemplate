import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleToAdmin = () => {
    navigate('/admin');
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>仪表盘</h1>
      <p>欢迎访问系统仪表盘。</p>
      <div onClick={handleToAdmin} >to admin</div>
    </div>

  );
};

export default Dashboard;
