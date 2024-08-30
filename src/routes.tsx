import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UpdateState from './pages/UpdateState';
import UpdateState2 from './pages/UpdateState2';

import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import AuthRoute from './components/AuthRoute';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/updateState" element={<UpdateState />} />
      <Route path="/updateState2" element={<UpdateState2 />} />
      <Route
        path="/dashboard"
        element={<AuthRoute element={<Dashboard />} />}
      />
      <Route
        path="/admin"
        element={<AuthRoute element={<AdminPage />} role="admin" />}
      />
    </Routes>
  </Router>
);

export default AppRoutes;
