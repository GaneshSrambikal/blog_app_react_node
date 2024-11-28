// import React from 'react'
import '../../styles/login.css';
import { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import { ForgotPasswordSchema } from '../../validators/auth/loginValidator';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
const base_url = import.meta.env.VITE_API_BASE_URL;
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const [sentEmail, setSentEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetLink, setResetLink] = useState('');

  const handleInputChange = (e, name) => {
    setErrors({});
    const { value } = e.target;
    if (name === 'email') {
      setEmail(value);
    }
  };
  const validate = () => {
    const { error } = ForgotPasswordSchema.validate(
      { email },
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
    console.log('clicked');
    const validationErrors = validate();
    if (validationErrors) {
      console.log(validationErrors);
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear previous errors
    setIsLoading(true);
    try {
      const response = await axios.post(`${base_url}/users/forgot-password`, {
        email,
      });
      console.log('password sent', response.data);
      setSentEmail(true);
      let link = `${base_url}/reset-password/${response.data.resetToken}/?emailId=${email}`;
      setResetLink(link);
      // Handle successful login, e.g., redirect or store token
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.message.includes('email')) {
        setErrors({ email: error.response.data.message });
        console.log(error, errors);
      } else {
        setErrors({
          email: error.response.data.message,
        });
        console.log(error, errors);
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
          <h2>Reset your password</h2>
          {!sentEmail ? (
            <p>
              To reset your password, enter your email below and submit. An
              email will be sent to you with instructions about how to complete
              the process.
            </p>
          ) : (
            <p>A reset password link has been sent to your email.</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          {!sentEmail && (
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
          )}

          {errors.server && (
            <span className='error-message server-error'>{errors.server}</span>
          )}

          <div className='form-group'>
            {sentEmail ? (
              <button type='button' className='submit-button'>
                <span>Sent</span> <FaCheckCircle />
              </button>
            ) : isLoading ? (
              <button
                type='button'
                className=' submit-button submit-loading-btn'
                disabled
              >
                <TailSpin
                  visible={true}
                  height='20'
                  width='20'
                  color='#FFF'
                  ariaLabel='tail-spin-loading'
                  radius='1'
                  wrapperStyle={{}}
                  wrapperClass=''
                />
              </button>
            ) : (
              <button type='submit' className='submit-button'>
                Reset Password
              </button>
            )}
          </div>

          {/* Timer to redirect after successfully sending email */}
          {sentEmail && (
            <div className='form-group'>
              <div className='success-redirect-timer'>
                <FaCheckCircle />
                <span>
                  Click <a href={resetLink}>here</a> to reset password
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
