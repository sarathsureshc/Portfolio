import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const PrivateRoute = () => {
  const { userInfo, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;