import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
// import ResetPassword from './pages/ForgotPasswordPage';
// import ChangePassword from './pages/ChangePassword';
import LandingPage from './pages/LandingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
import ProfilePage from './pages/profile/ProfilePage';
import UpdateProfilePage from './pages/profile/UpdateProfilePage';
import Layout from './pages/Layout';
import PublicRoutes from './routes/PublicRoutes';
import UsersProfilePage from './pages/profile/UsersProfilePage';
import BlogPage from './pages/blogs/BlogPage';
import CreateBlogPage from './pages/blogs/CreateBlogPage';
import UpdateBlogPage from './pages/blogs/UpdateBlogPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path='/' element={<LandingPage />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route
            path='/reset-password/:token'
            element={<ResetPasswordPage />}
          />
          <Route path='/reset-password/*' element={<Navigate to='/login' />} />
          <Route path='*' element={<NotFoundPage />} />

          {/* Routes with Navbar */}
          <Route element={<Layout />}>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<HomePage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/profile/:id' element={<UsersProfilePage />} />
              <Route path='/profile/edit' element={<UpdateProfilePage />} />
              {/* Dashboard */}
              <Route path='/dashboard' element={<DashboardPage />} />
              {/*Blog routes  */}
              <Route path='/blogs/blog/:id' element={<BlogPage />} />
              <Route
                path='/blogs/blog/create-blog'
                element={<CreateBlogPage />}
              />
              <Route path='/blogs/blog/edit/:id' element={<UpdateBlogPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <Analytics />
    </>
  );
}

export default App;
