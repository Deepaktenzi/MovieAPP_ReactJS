import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const store = useSelector((store) => store.auth);
  const isAuthenticated =
    store.isAuthenticated || localStorage.getItem('token');
  return <>{isAuthenticated ? <Component /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
