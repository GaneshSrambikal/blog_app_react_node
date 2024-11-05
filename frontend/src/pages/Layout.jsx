import { Outlet, useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../index.css';
const Layout = () => {
  const location = useLocation();
  const params = useParams();
  const routesWithNavbar = [
    '/profile',
    '/home',
    '/profile/',
    '/profile/edit',
    `/profile/${params.id}`,
    `/blogs/blog/${params.id}`,
    `/blogs/blog/create-blog`,
    `/blogs/blog/edit/${params.id}`,
  ];
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
