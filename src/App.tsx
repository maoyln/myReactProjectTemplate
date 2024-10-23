import React, {Suspense} from 'react';
import Routes from './routes';
import EllipsisTip from './components/EllipsisTip'
import 'antd/dist/reset.css'; // Ant Design 样式重置
import './styles/global.css'; // 自定义全局样式

// 懒加载
// const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EllipsisTip />
      <Routes />
    </Suspense>
  );
};

export default App;
