// import React from 'react'
import '../../styles/login.css';
import { useState } from 'react';
import axios from 'axios';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../validators/auth/loginValidator';
import { useAuth } from '../../context/AuthContext';
const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      console.log(validationErrors);
    } else {
      console.log('Form submitted:', formData);
      setErrors({}); // Clear previous errors
      try {
        const response = await axios.post('/api/users/login', formData);
        console.log('Login successful:', response.data);
        // Handle successful login, e.g., redirect or store token
        // const token = response.data.token;
        // localStorage.setItem('blog_AuthToken', token);
        login(response.data.token, response.data.user);
        navigate('/home');
      } catch (error) {
        console.log(error);
        setErrors({ server: error.response.data.message });
      }
    }
  };

  const togglePass = () => {
    setShowPassword(!showPassword);
  };
  const getInputClass = (fieldName) => {
    return errors[fieldName] ? 'input-error' : '';
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
            {errors.server && (
              <span className='server-error'>{errors.server}</span>
            )}
          </div>
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
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className={`${getInputClass('email')}`}
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
            {formData.password.length > 1 && (
              <span className='login-password'>
                <a href='/forgot-password'>forgot password?</a>
              </span>
            )}
          </div>

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
