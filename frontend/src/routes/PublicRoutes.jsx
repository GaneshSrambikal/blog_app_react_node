import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  const { isAuthenticated, loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);
  return isAuthenticated ? <Navigate to='/home' /> : <Outlet />;
};

export default PublicRoutes;
