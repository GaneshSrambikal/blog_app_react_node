import '../../styles/login.css';
import { useContext, useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../validators/auth/loginValidator';
import InputComponent from '../ui/InputComponent';
import AuthContext from '../../context/AuthContext';
import { Oval } from 'react-loader-spinner';
import Logo from '../Logo'
const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const togglePass = () => {
    setShowPassword(!showPassword);
  };
  const getInputClass = (fieldName) => {
    return errors[fieldName] ? 'input-error' : '';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateLoginForm(formData);
    if (validationErrors) {
      setLoading(false);
      setErrors(validationErrors);
      console.log(validationErrors);
    } else {
      setLoading(true);
      // console.log('Form submitted:', formData);
      setErrors({}); // Clear previous errors
      try {
        await loginUser(formData);
        setLoading(false);
        navigate('/home');
      } catch (error) {
        console.log(error.response);
        setLoading(false);
        if (error.response.status === 500) {
          setErrors({ server: error.response?.statusText });
        }
        setErrors({ server: error.response?.data?.message });
        // console.log(errors);
      }
    }
  };

  return (
    <div className='login-div'>
      <div className='login-branding'>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <div className='login-container'>
        <div className='login-fm-header'>
          <h2>Login</h2>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          {/* Server Errors */}
          <div className='form-group'>
            {errors.server && (
              <span className='server-error'>{errors.server}</span>
            )}
          </div>
          {/* Success register message */}
          <div className='form-group'>
            {location.state?.message && (
              <p className='success-login'>{location.state?.message}</p>
            )}
          </div>
          {/* Email */}
          <InputComponent
            label={'Email'}
            type={'email'}
            id={'email'}
            name={'email'}
            value={formData.email}
            onChange={handleInputChange}
            className={`${getInputClass('email')}`}
            error={errors.email}
          />

          {/* Password */}
          <div className='form-group login-password-group'>
            <label htmlFor='password'>Password</label>
            <div className='login-password-wrapper'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={formData.password}
                name='password'
                onChange={handleInputChange}
                className={`${getInputClass('password')}`}
              />
              <span className='login-toggle-password' onClick={togglePass}>
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
            {errors.password && (
              <span className='error-message'>{errors.password}</span>
            )}
            {/* Forgot  Password Link */}
            {formData.password.length > 1 && (
              <span className='login-password'>
                <a href='/forgot-password'>forgot password?</a>
              </span>
            )}
          </div>

          <div className='form-group'>
            <button type='submit' className='submit-button'>
              {loading ? (
                <Oval
                  visible={loading}
                  height='20'
                  width='20'
                  color='#fff'
                  ariaLabel='oval-loading'
                  wrapperStyle={{}}
                  wrapperClass=''
                />
              ) : (
                `Login`
              )}
            </button>
          </div>
        </form>
        <div className='login-fm-footer'>
          <p>
            {`Don't have an account?`} <a href='/register'>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
