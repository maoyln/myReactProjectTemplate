import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface AuthRouteProps {
  element: React.ReactElement;
  role?: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element, role }) => {
  const { isAuthenticated, userRole } = useAuthStore();
  const location = useLocation();
  console.log(isAuthenticated, 'isAuthenticated');
  console.log(userRole, 'userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default AuthRoute;
