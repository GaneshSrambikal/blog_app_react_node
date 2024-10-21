// import React from 'react'
import '../styles/login.css';
import LoginIlls from '../assets/images/loginbghuman.svg';
import LoginForm from '../components/auth/LoginForm';
const LoginPage = () => {
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
