import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect routes
const PrivateRoute = ({ authToken, children }) => {
  // If there is no authToken, redirect to login page
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  // If there is an authToken, render the children components
  return children;
};

export default PrivateRoute;