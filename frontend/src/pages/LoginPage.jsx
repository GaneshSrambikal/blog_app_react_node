// import React from 'react'
// import { useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import LoginIlls from '../assets/images/loginbghuman.svg';
import LoginForm from '../components/auth/LoginForm';
import '../styles/login.css';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const LoginPage = () => {
  // const { user } = useAuth();
  // const navigate = useNavigate();
  const { isAuthenticated, loading } = useContext(AuthContext);
 
  console.log(isAuthenticated, loading);
  if (isAuthenticated) return <Navigate to='/home' />;

  return (
    <div className='login-main-div'>
      {/* Login Component */}
      <LoginForm />
      <div className='login-showcase'>
        <div className='login-showcase-ilst'>
          <div className='ilst-imgs'>
            <img src={LoginIlls} alt='login-bg-human' />
            <div className='ilst-imgs-des'>
              <span>
                illustration:{' '}
                <a href='https://undraw.co/' target='_blank'>
                  uDraw.co
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
