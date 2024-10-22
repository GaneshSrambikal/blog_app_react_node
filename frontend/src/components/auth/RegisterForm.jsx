import { useState } from 'react';
import Joi from 'joi';
import '../../styles/register.css';
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  // Joi schema for validation
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'any.required': 'Username is required',
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Email must be valid',
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
      }),
    password: Joi.string()
      .min(6)
      .required()
      .custom((value, helpers) => {
        const email = helpers.state.ancestors[0].email;
        const regex = new RegExp(email, 'i');
        if (regex.test(value)) {
          return helpers.message('Password cannot contain the email address');
        }
        return value;
      })
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
      }),
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(formData);
    if (error) {
      setError(error.details[0].message);
      return;
    }

    setError(null);
    // Submit the form data (e.g., API call)
    console.log('Form submitted:', formData);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='register-div'>
      <div className='register-branding'>
        <h2>Blog_App</h2>
      </div>
      <div className='register-container'>
        <div className='login-fm-header'>
          <h2>Register</h2>
          <p>Enter your credentials to create your account</p>
        </div>
        <form onSubmit={handleSubmit} className='register-form'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-groups'>
            {/* Gender */}
            <div className='form-group'>
              <label htmlFor='gender'>Gender</label>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                required
                className='register-form-gender-select'
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='dob'>Date of Birth</label>
              <input
                type='date'
                name='dob'
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          
            <button type='submit' className='submit-button register-submit-btn'>
              Register
            </button>
          
        </form>
        <div className='register-fm-footer'>
          <p>
            {`Already registered `} <a href='/login'>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
