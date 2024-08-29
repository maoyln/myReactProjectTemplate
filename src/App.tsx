import React from 'react';
import Routes from './routes';
import 'antd/dist/reset.css'; // Ant Design 样式重置
import './styles/global.css'; // 自定义全局样式

const App: React.FC = () => {
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
