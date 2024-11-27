import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { checkToken } from '../utils/checkToken';

const ProtectedRoute = () => {
  const { isAuthenticated, loading, loadUser, token } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <div>loading...</div>;
  return isAuthenticated && checkToken(token) ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
