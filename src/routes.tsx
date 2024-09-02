import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import AuthRoute from './components/AuthRoute';


import UpdateState from './pages/UpdateState';
import UpdateState2 from './pages/UpdateState2';
import CreatePortalDom from './pages/reactPortalDom';
import UseMemoDemo from './pages/UseMemoDemo';
import UseCallbackDemo from './pages/UseCallbackDemo';
import UseMemoAndCallback from './pages/UseMemoAndCallback';
import ContextMain from './pages/ContextDemo/ContextMain'

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
      <Route path="/useMemoDemo" element={<UseMemoDemo />} />
      <Route path="/useCallbackDemo" element={<UseCallbackDemo />} />
      <Route path="/useMemoAndCallback" element={<UseMemoAndCallback />} />
      <Route path='/contextDemo' element={<ContextMain />}></Route>
    </Routes>
  </Router>
);

export default AppRoutes;
