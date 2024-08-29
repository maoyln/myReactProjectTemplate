import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleToDashboard = () => {
    navigate('/dashboard');
  }
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>管理员页面</h1>
      <p>只有管理员可以访问此页面。</p>
      <div onClick={handleToDashboard}>to dashboard</div>
    </div>
  );
};

export default AdminPage;
