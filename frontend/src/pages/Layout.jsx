import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
  const location = useLocation();
  const routesWithNavbar = ['/profile', '/home', '/profile/edit'];
  const showNavbar = routesWithNavbar.includes(location.pathname);
  return (
    <div>
      {/* Show navbar if routes exist */}
      {showNavbar && <Navbar />}

      {/* Render the main content */}
      <Outlet />
    </div>
  );
};

export default Layout;
