// import React from 'react'
import '../styles/login.css';
import ForgotIlls from '../assets/images/forgot-password-hero.svg';
import ForgotPasswordForm from '../components/password/ForgotPasswordForm';
const ForgotPasswordPage = () => {
  return (
    <div className='login-main-div'>
      {/* Forgot Password Component */}
      <ForgotPasswordForm />
      <div className='login-showcase'>
        <div className='login-showcase-ilst'>
          <div className='ilst-imgs'>
            <img src={ForgotIlls} alt='forgot-password' />
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

export default ForgotPasswordPage;
