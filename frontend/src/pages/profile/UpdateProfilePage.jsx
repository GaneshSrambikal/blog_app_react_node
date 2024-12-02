// import React from 'react'
import { useContext, useEffect, useState, useRef } from 'react';
import { getInitials } from '../../utils/formatNames';
import InputComponent from '../../components/ui/InputComponent';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

import { validateUpdateForm } from '../../validators/profile/updateValidator';
import { Link, useNavigate } from 'react-router-dom';
import { TbPhotoEdit } from 'react-icons/tb';
import { resizeImage } from '../../utils/resizeImage';
import { useToast } from '../../context/ToastContext';
import { Helmet } from 'react-helmet';
import { SiGooglegemini } from 'react-icons/si';
import { model } from '../../utils/gemini-ai';
import { Oval } from 'react-loader-spinner';
const UpdateProfilePage = () => {
  const react_base_url = import.meta.env.VITE_API_BASE_URL;
  const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
  const { user, token, dispatch, loadUser } = useContext(AuthContext);
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState({});
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [showUploadAction, setShowUploadAction] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();
  const addToast = useToast();
  const avatarActionRef = useRef(null);
  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    setFormData(user);
  }, []);
  // listen for outside div clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        avatarActionRef.current &&
        !avatarActionRef.current.contains(e.target)
      ) {
        setShowUploadAction(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
  const handleUploadAction = () => {
    setShowUploadAction(!showUploadAction);
  };
  const handleInputSubmit = async (img) => {
    if (img) {
      const avatarFormData = new FormData();
      avatarFormData.append('image', img);
      avatarFormData.append('upload_preset', preset);
      console.log('im here');
      setLoadingUpload(true);
      try {
        // update user profile
        const updatedUser = await axios.post(
          `${react_base_url}/users/upload-avatar`,
          avatarFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({
          type: 'LOAD_USER',
          payload: { userData: updatedUser.data.user, token },
        });
        setLoadingUpload(false);
        handleUploadAction();
        console.log('updated profile picture', updatedUser);
        addToast('User avatar updated successfully.', 'toaster-success');
      } catch (error) {
        console.log(error);
        setLoadingUpload(false);
      }
    }
  };
  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    console.log('actually file', file);
    if (file) {
      // resize image for image optimization
      const resized = await resizeImage(
        file,
        200,
        `${formData.username + Date.now().toString()}.png`
      );
      handleInputSubmit(resized);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserData = {
      name: formData.name,
      address: formData.address,
      dob: formData.dob,
      gender: formData.gender,
      title: formData.title,
      about: formData.about,
    };
    const validationErrors = validateUpdateForm(newUserData);
    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const updatedUser = await axios.put(
          `${react_base_url}/users/profile`,
          newUserData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // if (updatedUser.statusText == 'OK') {
        dispatch({
          type: 'LOAD_USER',
          payload: { userData: updatedUser.data.user, token },
        });
        addToast('Profile updated successfully', 'toaster-success');
        console.log('dispatch sent', user);
        navigate('/profile');
        // }
        console.log('updatedUser', updatedUser);
      } catch (error) {
        console.log(error);
        setErrors({ server: error && error.response?.data?.message });
        console.log(errors);
      }
    }
    console.log('Submitted:', formData);
  };
  const handleGenerateAvatar = async () => {
    setLoadingGenerate(true);
    try {
      const res = await axios.get(`${react_base_url}/users/generate-avatar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: 'LOAD_USER',
        payload: { userData: res.data.user, token },
      });
      setLoadingGenerate(false);
      handleUploadAction();
      addToast('User avatar updated successfully', 'toaster-success');
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoadingGenerate(false);
    }
  };
  const handleAiAbout = async () => {
    setAiLoading(true);
    if (!formData?.title || formData?.title === '') {
      setErrors({ title: 'Please select title' });
      setAiLoading(false);
    } else {
      if (user?.totalAiCredits > 20) {
        try {
          const res = await model.generateContent(
            `Write a short bio for ${formData.title}. be creative and limit the response to 150 characters.`
          );
          setFormData({
            ...formData,
            about: res.response.text(),
          });
          console.log(res.response.text());
          setAiLoading(false);
          // update user ai credits
          await axios.post(
            `${react_base_url}/users/update-credits`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          loadUser();
        } catch (error) {
          setAiLoading(false);
          console.log(error);
        }
      }
    }
  };
  if (!user) return <div>Loading</div>;
  return (
    <>
      <Helmet>
        <title>{`Edit Profile | ${user?.name} | Blogsphere`}</title>
      </Helmet>
      <div className='edit-profile-container'>
        <div className='edit-profile-avatar-c'>
          {formData.avatar_url ? (
            loadingUpload || loadingGenerate ? (
              <div>loading</div>
            ) : (
              <img src={user.avatar_url} alt='profile-avatar' loading='lazy' />
            )
          ) : (
            <p>{formData?.name && getInitials(formData?.name)}</p>
          )}
          <div
            className='edit-profile-avatar-icon-c'
            onClick={handleUploadAction}
          >
            <TbPhotoEdit />
          </div>
          {showUploadAction && (
            <div
              className='edit-profile-avatar-action-menu'
              ref={avatarActionRef}
            >
              <div className='edit-profile-file-upload'>
                <input
                  type='file'
                  id='avatarInput'
                  accept='image/*'
                  onChange={handleFileInput}
                  disabled={loadingUpload}
                />
                <label htmlFor='avatarInput' className='avatar-input-label'>
                  {loadingUpload ? 'loading' : 'Choose File'}
                </label>
              </div>
              <div>
                {loadingGenerate ? (
                  <button disabled>
                    {loadingGenerate ? 'loading' : 'generate avatar'}
                  </button>
                ) : (
                  <button onClick={handleGenerateAvatar}>
                    {loadingGenerate ? 'loading' : 'generate avatar'}
                  </button>
                )}
              </div>
            </div>
          )}
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
                value={formData?.about}
                onChange={handleChange}
                className={`${getInputClass('about')} edit-profile-textarea`}
                error={errors.about}
                required={false}
                placeholder='Introduce yourself...'
                disabled={aiLoading}
              />
              {/* Gemini AI for generating about content */}
              <div className='form-group'>
                <label>
                  Or generate about with gemini AI{' '}
                  <span
                    className='edit-profile-ai-credits-label'
                    style={{
                      color: user?.totalAiCredits < 20 ? 'red' : 'blue',
                    }}
                  >
                    {user && `(${user?.totalAiCredits} credits left)`}
                  </span>
                </label>
                <button
                  type='button'
                  onClick={handleAiAbout}
                  className={`edit-profile-ai-gen-btn ${
                    user?.totalAiCredits < 20 && 'ep-p-ai-disabled'
                  }`}
                  disabled={user?.totalAiCredits < 20 ? true : false}
                >
                  {aiLoading ? (
                    <>
                      <Oval
                        visible={aiLoading}
                        height='20'
                        width='20'
                        color='#f369f2'
                        ariaLabel='oval-loading'
                        wrapperStyle={{}}
                        wrapperClass=''
                      />{' '}
                      <span style={{ marginLeft: '1rem' }}>
                        {' '}
                        Generating content . . .
                      </span>{' '}
                    </>
                  ) : (
                    <>
                      Generate with <SiGooglegemini /> Gemini
                    </>
                  )}
                </button>
                {formData?.totalAiCredits < 20 && (
                  <Link to='/dashboard'>buy more credits</Link>
                )}
              </div>
              {/* title */}
              <InputComponent
                type='select'
                id='title'
                name='title'
                label='Title'
                value={formData.title}
                onChange={handleChange}
                className={`${getInputClass(
                  'title'
                )} edit-profile-title-select`}
                error={errors.title}
                disabled={aiLoading}
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
                required={false}
                disabled
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

              {/* update btn */}
              <div className='edit-profile-update-btn-c'>
                <button
                  type='submit'
                  className='submit-button'
                  disabled={aiLoading}
                >
                  Update Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateProfilePage;
