// import React from 'react'

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/formatNames';
import InputComponent from '../../components/ui/InputComponent';

const UpdateProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState({});
  console.log(formData);
  useEffect(() => {
    setFormData(user);
  }, [user]);
  // Handle input change
  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const getInputClass = (fieldName) => {
    return errors[fieldName] ? 'input-error' : '';
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };
  if (!user) return <div>Loading</div>;
  return (
    <div className='edit-profile-container'>
      <div className='edit-profile-avatar-c'>
        <p>{formData && getInitials(formData.name)}</p>
      </div>
      <div className='edit-profile-form-c'>
        <div className='edit-profile-form-header'>
          <h1>Edit Profile</h1>
        </div>
        {formData && (
          <form onSubmit={handleSubmit}>
            {/* About */}
            <InputComponent
              type='textarea'
              label='About'
              id='about'
              name='about'
              value={formData && formData.about}
              onChange={handleChange}
              className={`${getInputClass('about')} edit-profile-textarea`}
              error={errors.about}
              required={false}
              placeholder='Introduce yourself...'
            />
            {/* title */}
            <InputComponent
              type='select'
              id='title'
              name='title'
              label='Title'
              value={formData.title}
              onChange={handleChange}
              className={`${getInputClass('title')} edit-profile-title-select`}
              error={errors.title}
            />
            {/* Email*/}
            <InputComponent
              type='email'
              label='Email'
              id='email'
              name='email'
              value={formData && formData.email}
              onChange={handleChange}
              className={`${getInputClass('email')}`}
              error={errors.email}
              required={false}
              disabled
            />
            {/* Name */}
            <InputComponent
              type='text'
              label='Name'
              id='name'
              name='name'
              value={formData && formData.name}
              onChange={handleChange}
              className={`${getInputClass('name')}`}
              error={errors.name}
              required={true}
            />
            {/* Username */}
            <InputComponent
              type='text'
              label='Username'
              id='username'
              name='username'
              value={formData && formData.username}
              onChange={handleChange}
              className={`${getInputClass('username')}`}
              error={errors.username}
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
                  value={formData.dob.split('T')[0]}
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
              {errors.gender && (
                <p className='error-message'>{errors.gender}</p>
              )}
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
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProfilePage;
