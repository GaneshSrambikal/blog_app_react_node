import { useState } from 'react';
import '../../styles/register.css';
import { validateRegisterForm } from '../../validators/auth/registerValidator';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import InputComponent from '../ui/InputComponent';
import Logo from '../Logo';
const react_base_url = import.meta.env.VITE_API_BASE_URL;
const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    address: '',
    gender: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = validateRegisterForm(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      setIsLoading(false);
    } else {
      setErrors({});
      setIsLoading(true);
      // Submit the form data (e.g., API call)
      // console.log('Form submitted:', formData);
      try {
        const response = await axios.post(
          `${react_base_url}/users/register`,
          formData
        );
        console.log('User created', response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate('/login', {
            state: { message: 'You have been registered. Login now.' },
          });
        }, 3000);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrors({ server: error.response.data.message });
      }
    }
  };

  const getInputClass = (fieldName) => {
    return errors[fieldName] ? 'input-error' : '';
  };

  return (
    <div className='register-div'>
      <div className='register-branding'>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <div className='register-container'>
        <div className='login-fm-header'>
          <h2>Register</h2>
          <p>Enter your credentials to create your account</p>
        </div>
        <form onSubmit={handleSubmit} className='register-form'>
          {/* name */}
          <InputComponent
            type='text'
            name='name'
            id='name'
            label='Name'
            value={formData.name}
            onChange={handleChange}
            className={`${getInputClass('name')}`}
            error={errors.name}
            required={true}
          />
          {/* Gender */}
          <div className='form-groups'>
            <div className='form-group'>
              <label htmlFor='gender'>
                Gender<span className='label-required'>*</span>
              </label>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                className={`register-form-gender-select ${getInputClass(
                  'gender'
                )}`}
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='dob'>
                Date of Birth<span className='label-required'>*</span>
              </label>
              <input
                type='date'
                name='dob'
                value={formData.dob}
                onChange={handleChange}
                min='1980-01-01'
                max={new Date().toISOString().split('T')[0]}
                className={`${getInputClass('dob')}`}
              />
            </div>
          </div>
          {/* errors for gender and dob */}
          <div className='form-group'>
            {errors.dob && <p className='error-message'>{errors.dob}</p>}
            {errors.gender && <p className='error-message'>{errors.gender}</p>}
          </div>

          {/* Address */}
          <InputComponent
            type='text'
            name='address'
            id='address'
            label='Address'
            value={formData.address}
            onChange={handleChange}
            className={`${getInputClass('address')}`}
            error={errors.address}
            required={true}
          />

          {/* Email */}
          <InputComponent
            type='email'
            name='email'
            id='email'
            label='Email'
            value={formData.email}
            onChange={handleChange}
            className={`${getInputClass('email')}`}
            error={errors.email}
            required={true}
          />
          {/* Username */}
          <InputComponent
            type='text'
            name='username'
            id='username'
            label='Username'
            value={formData.username}
            onChange={handleChange}
            className={`${getInputClass('username')}`}
            error={errors.username}
            required={true}
          />

          <div className='form-group'>
            <label htmlFor='password'>
              Password<span className='label-required'>*</span>
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className={`${getInputClass('password')}`}
            />
            {errors.password && (
              <p className='error-message'>{errors.password}</p>
            )}
          </div>
          <div className='form-group'>
            {errors.server && <p className='error-message'>{errors.server}</p>}
          </div>
          {isLoading ? (
            <button type='button' className='submit-button register-submit-btn'>
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
            <button type='submit' className='submit-button register-submit-btn'>
              register
            </button>
          )}
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
