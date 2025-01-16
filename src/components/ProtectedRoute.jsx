import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, isAdmin }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isLoggedInAdmin = localStorage.getItem('isLoggedInAdmin') === 'true';
  if (isAdmin) {
    return isLoggedInAdmin ? element : <Navigate to="/admin" />;
  }

  return isLoggedIn ? element : <Navigate to="/" />;
}

export default ProtectedRoute;
