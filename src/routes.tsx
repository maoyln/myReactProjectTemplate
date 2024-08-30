import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import AuthRoute from './components/AuthRoute';


import UpdateState from './pages/UpdateState';
import UpdateState2 from './pages/UpdateState2';
import CreatePortalDom from './pages/reactPortalDom';
import MemoDemo from './pages/MemoDemo';

// 懒加载
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const AppRoutes = () => (
  <Router>
    <Routes>
    <Route path="/"  element={ <Navigate to='/login' replace /> } />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={<AuthRoute element={<Dashboard />} />}
      />
      <Route
        path="/admin"
        element={<AuthRoute element={<AdminPage />} role="admin" />}
      />
      <Route path="/updateState" element={<UpdateState />} />
      <Route path="/updateState2" element={<UpdateState2 />} />
      <Route path="/reactPortalDom" element={<CreatePortalDom />} />
      <Route path="/memoDemo" element={<MemoDemo />} />
      
      
    </Routes>
  </Router>
);

export default AppRoutes;
