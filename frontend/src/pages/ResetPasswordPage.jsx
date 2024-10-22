// import React from 'react'
import ResetIlls from '../assets/images/forgot-password-hero.svg';
import ResetPasswordForm from '../components/password/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className='login-main-div'>
      {/* Reset Password Component */}
      <ResetPasswordForm />
      <div className='login-showcase'>
        <div className='login-showcase-ilst'>
          <div className='ilst-imgs'>
            <img src={ResetIlls} alt='reset-password' />
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

export default ResetPasswordPage;
