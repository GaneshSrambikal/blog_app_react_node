// import React from 'react'
import '../../styles/login.css';
import { useState } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { Link, useNavigate, useParams } from 'react-router-dom';
const react_base_url = import.meta.env.REACT_APP_API_BASE_URL;
const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [passwordDone, setPasswordDone] = useState(false);

  const navigate = useNavigate();
  //   const getParams = () => {
  const { token } = useParams(); // Extract token from the URL
  const emailId = new URLSearchParams(window.location.search).get('emailId'); // Extract email from query params

  const validateInput = () => {
    // if for the email
    const regex = new RegExp(emailId);
    if (regex.test(password)) {
      return true;
    }

    return false;
  };
  const checkInputs = () => {
    if (
      password.includes(emailId) ||
      password === emailId ||
      validateInput() ||
      password.includes(emailId.split('@')[0]) ||
      password.match(emailId.slice(0, 4)) !== null ||
      password.match(/[!-/:-@[-`{-~]/) !== null ||
      password.length !== 0
    ) {
      setIsDone(false);
    }
    if (confirmPassword.length > 2) {
      setIsDone(true);
    }
  };
  const handleInputChange = (e, name) => {
    checkInputs();
    setErrors({});
    const { value } = e.target;
    if (name === 'confirm-password') {
      setConfirmPassword(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({
        password: 'Passwords do not match',
        confirmPassword: 'Passwords do not match',
      });
    } else {
      setErrors({}); // Clear previous errors
      try {
        const response = await axios.post(
          `${react_base_url}/users/reset-password/${token}`,
          {
            password,
          }
        );
        console.log('Password reset done', response.data);
        // Handle successful login, e.g., redirect or store token
        setPasswordDone(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        console.error('Password reset failed', error.response.data);
        setErrors({
          server: `${error.response.data.message}.`,
        });
      }
    }
  };
  const togglePass = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-div'>
      <div className='login-branding'>
        <h2>Blog_App</h2>
      </div>
      {passwordDone ? (
        <div className='login-container'>
          <div className='login-fm-header'>
            <h2>Reset your Password</h2>

            <div className='form-group'>
              <span className='reset-success-span'>
                <FaCheck />
                Password successfully Updated!.
              </span>
              <Link type='button' className='submit-button' to='/login'>
                Login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='login-container'>
          <div className='login-fm-header'>
            <h2>Reset your Password</h2>

            <p>Enter your new password</p>
            {errors.server && (
              <span className='error-message server-error'>
                {errors.server}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className='login-form'>
            {/* Email */}
            <div className='form-group'>
              <label htmlFor='email' className='login-email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={emailId}
                className={errors.email ? 'error' : ''}
                disabled
              />
              {errors.email && (
                <span className='error-message'>{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className='form-group login-password-group'>
              <label htmlFor='password'>New Password</label>
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
              {/* Validate password */}
              <span
                className='reset-pass-validate'
                style={{
                  marginTop: '.8rem',
                  display: 'flex',
                  color:
                    password.length > 8
                      ? '#333'
                      : password.length == 0
                      ? '#c5c5c5'
                      : '#ff4b4b',
                }}
              >
                {password.length > 8 ? (
                  <FaCheck style={{ color: 'green' }} />
                ) : (
                  <MdOutlineCancel
                    style={{
                      color: password.length == 0 ? '#c5c5c5' : '#ff4b4b',
                    }}
                  />
                )}
                Must be at least 8 characters.
              </span>
              {/* special characters */}
              <span
                className='reset-pass-validate'
                style={{
                  display: 'flex',
                  color:
                    password.length == 0
                      ? '#c5c5c5'
                      : password.match(/[!-/:-@[-`{-~]/) !== null
                      ? '#333'
                      : '#ff4b4b',
                }}
              >
                {password.match(/[!-/:-@[-`{-~]/) !== null ? (
                  <FaCheck
                    style={{
                      color:
                        password.match(/[!-/:-@[-`{-~]/) == null
                          ? '#ff4b4b'
                          : password.length == 0
                          ? '#c5c5c5'
                          : 'green',
                    }}
                  />
                ) : (
                  <MdOutlineCancel />
                )}{' '}
                {`Must contain special characters ('!,@,#,$').`}
              </span>

              {/* email exist */}
              <span
                className='reset-pass-validate'
                style={{
                  display: 'flex',
                  color:
                    password.length == 0
                      ? '#c5c5c5'
                      : password.includes(emailId) ||
                        password === emailId ||
                        validateInput() ||
                        password.includes(emailId.split('@')[0]) ||
                        password.match(emailId.slice(0, 4)) !== null
                      ? '#ff4b4b'
                      : '#333',
                }}
              >
                {password.length > 0 ? (
                  password.includes(emailId) ||
                  password === emailId ||
                  validateInput() ||
                  password.includes(emailId.split('@')[0]) ||
                  password.match(emailId.slice(0, 4)) !== null ? (
                    <MdOutlineCancel style={{ color: '#ff4b4b' }} />
                  ) : (
                    <FaCheck style={{ color: 'green' }} />
                  )
                ) : (
                  <MdOutlineCancel />
                )}
                Does not contain your email address.
              </span>
            </div>
            {/* Confirm Password */}
            <div className='form-group login-password-group'>
              <label htmlFor='password'>Confirm New Password</label>
              <div className='login-password-wrapper'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='confirm-password'
                  value={confirmPassword}
                  onChange={(e) => handleInputChange(e, 'confirm-password')}
                  className={errors.password ? 'error' : ''}
                />
                <span className='login-toggle-password' onClick={togglePass}>
                  {showPassword ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>
            </div>

            <div className='form-group'>
              {isDone ? (
                <button type='submit' className='submit-button'>
                  Reset Password
                </button>
              ) : (
                <button
                  type='button'
                  className='submit-button reset-disable'
                  disabled
                >
                  No Reset Password
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
