// import React from 'react'
import '../../styles/login.css';
import { useState } from 'react';
import axios from 'axios';
import { LoginSchema } from '../../validators/auth/loginValidator';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e, name) => {
    setErrors({});
    const { value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const validate = () => {
    const { error } = LoginSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (!error) return null;
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear previous errors
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Handle successful login, e.g., redirect or store token
      const token = response.data.token;
      localStorage.setItem('blog_AuthToken', token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      if (error.response.data.message.includes('email')) {
        setErrors({ email: error.response.data.message });
        console.log(error, errors);
      } else if (error.response.data.message.includes('password')) {
        setErrors({ password: error.response.data.message });
        console.log(error, errors);
      } else {
        setErrors({
          email: error.response.data.message,
          password: error.response.data.message,
        });
        console.log(error, errors);
      }
    }
  };
  const togglePass = () => {
    console.log(showPassword);
    setShowPassword(!showPassword);
  };
  return (
    <div className='login-div'>
      <div className='login-branding'>
        <h2>Blog_App</h2>
      </div>
      <div className='login-container'>
        <div className='login-fm-header'>
          <h2>Login</h2>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-group'>
            {location.state?.message && (
              <p className='success-login'>{location.state?.message}</p>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='email' className='login-email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => handleInputChange(e, 'email')}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className='error-message'>{errors.email}</span>
            )}
          </div>

          <div className='form-group login-password-group'>
            <label htmlFor='password'>Password</label>
            <div className='login-password-wrapper'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={(e) => handleInputChange(e, 'password')}
                className={errors.password ? 'error' : ''}
              />
              <span className='login-toggle-password' onClick={togglePass}>
                {showPassword ? <LuEye /> : <LuEyeOff />}
              </span>
            </div>
            {errors.password && (
              <span className='error-message'>{errors.password}</span>
            )}
            {password.length > 1 && (
              <span className='login-password'>
                <a href='/forgot-password'>forgot password?</a>
              </span>
            )}
          </div>

          {errors.server && (
            <span className='error-message server-error'>{errors.server}</span>
          )}
          <div className='form-group'>
            <button type='submit' className='submit-button'>
              Login
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
