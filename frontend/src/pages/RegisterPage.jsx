import RegisterForm from '../components/auth/RegisterForm';
import RegisterIlls from '../assets/images/registerhumanhero.svg';
import { Helmet } from 'react-helmet';
const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Register | Blogshpere</title>
      </Helmet>
      <div className='login-main-div'>
        <RegisterForm />
        <div className='register-showcase'>
          <div className='register-showcase-ilst'>
            <div className='ilst-imgs'>
              <img src={RegisterIlls} alt='register-bg-human' />
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
    </>
  );
};

export default RegisterPage;
