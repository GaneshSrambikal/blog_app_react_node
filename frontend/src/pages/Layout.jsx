import { Outlet, useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../index.css';
import Footer from '../components/Footer';
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
    `/dashboard`,
  ];
  const showNavbar = routesWithNavbar.includes(location.pathname);
  return (
    <div>
      {/* Show navbar if routes exist */}
      {showNavbar && <Navbar />}

      {/* Render the main content */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
