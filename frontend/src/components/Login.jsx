// import React from 'react'

import { useState } from 'react';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validate();
    // if (validationErrors) {
    //   setErrors(validationErrors);
    //   return;
    // }

    setErrors({}); // Clear previous errors
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Handle successful login, e.g., redirect or store token
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      setErrors({ server: error.response.data.message });
    }
  };
  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (
            <span className='error-message'>{errors.email}</span>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && (
            <span className='error-message'>{errors.password}</span>
          )}
        </div>

        {errors.server && (
          <span className='error-message server-error'>{errors.server}</span>
        )}

        <button type='submit' className='submit-button'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
