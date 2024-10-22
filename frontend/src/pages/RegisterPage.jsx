import RegisterForm from '../components/auth/RegisterForm';
import LoginIlls from '../assets/images/loginbghuman.svg';
const RegisterPage = () => {
  return (
    <div className='login-main-div'>
      <RegisterForm />
      <div className='register-showcase'>
        <div className='register-showcase-ilst'>
          <div className='ilst-imgs'>
            <img src={LoginIlls} alt='register-bg-human' />
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

export default RegisterPage;
