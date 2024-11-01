import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

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

function App() {
  return (
    <>
      <Router>
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
          {/*Blog routes  */}
          <Route path='/blog/:id' element={<BlogPage />} />
          {/* Routes with Navbar */}
          <Route element={<Layout />}>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<HomePage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/profile/:id' element={<UsersProfilePage />} />
              <Route path='/profile/edit' element={<UpdateProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
