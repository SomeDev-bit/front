import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

const AdminRoute = () => {
  const { user } = useSelector(state => state.userSlice);
  return user === null ? <Navigate to={'/login'} replace /> : user.role === 'admin' ? <Outlet /> : <Navigate to={'/'} replace />
}

export default AdminRoute
