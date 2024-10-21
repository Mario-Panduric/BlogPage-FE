import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!localStorage.getItem('isAuthenticated')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;