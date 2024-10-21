import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
