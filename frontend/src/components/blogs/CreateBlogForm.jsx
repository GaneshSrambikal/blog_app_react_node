import { useContext, useRef, useState } from 'react';
import InputComponent from '../ui/InputComponent';
import { validateCreateBlogForm } from '../../validators/blog/createBlogValidator';
import Joi from 'joi';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const CreateBlogForm = () => {
  const fileInputRef = useRef(null);
  const { token } = useContext(AuthContext);
  const react_base_url = import.meta.env.VITE_API_BASE_URL;
  const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
  const c_upload_url = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    heroImage: null,
  });
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState({});

  // schema for image for validation
  const imageSchema = Joi.object({
    heroImage: Joi.any().required().label('Image').messages({
      'any.required': 'Image is required',
      'any.empty': 'Image is required',
    }),
  });
  const handleInputChange = (e) => {
    setErrors({});

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = () => {
    setErrors({});
    // const file = e.target.files[0];
    if (fileInputRef.current.files[0]) {
      console.log('seting image');
      setFormData((prevData) => ({
        ...prevData,
        heroImage: URL.createObjectURL(fileInputRef.current.files[0]),
      }));
      setSelectedImage(URL.createObjectURL(fileInputRef.current.files[0]));
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFormData((prevData) => ({
      ...prevData,
      heroImage: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const getInputClass = (fieldName) => {
    return errors[fieldName] ? 'input-error' : '';
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, selectedImage);
    const validationErrors = validateCreateBlogForm(formData);
    if (validationErrors) {
      console.log(validationErrors);
      setErrors(validationErrors);
    } else {
      try {
        console.log(URL.revokeObjectURL(formData.heroImage));
        // 1. upload image to cloudinary
        const imageData = new FormData();
        imageData.append('file', fileInputRef.current.files[0]);
        imageData.append('upload_preset', preset);
        const res = await axios.post(c_upload_url, imageData);
        const imageUrl = res.data.secure_url;

        // 2. Submit blog data
        const newBlog = await axios.post(
          `${react_base_url}/blogs/create-blog`,
          {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            category: formData.category,
            heroImage: imageUrl,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Added blog successfully', newBlog);
      } catch (error) {
        console.log(error);
      }
    }

    // const validateImage = imageSchema.validate({
    //   heroImage: fileInputRef.current.files[0],
    // });
    // if (validateImage.error) {
    //   setImageError({
    //     heroImage: validateImage.error.details[0].message,
    //   });
    //   // console.log(errors);
    //   console.log('Image Error : ', validateImage);
    //   console.log(Object.keys(imageError).length);
    // } else {
    //   setImageError({});
    // }

    // if (
    //   Object.keys(errors).length === 0 &&
    //   Object.keys(imageError).length === 0
    // ) {
    //   console.log('form submitted successfully');
    //   const blogFormData = new FormData();
    //   blogFormData.append('heroImage', formData.heroImage);
    //   blogFormData.append('title', formData.title);
    //   blogFormData.append('content', formData.content);
    //   blogFormData.append('excerpt', formData.excerpt);
    //   blogFormData.append('category', formData.category);
    //   // blogFormData.append('upload_preset', preset);
    //   try {
    //     console.log(selectedImage);
    //     const newBlog = await axios.post(
    //       `${react_base_url}/blogs/create-blog`,
    //       blogFormData,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     console.log('New Blog', newBlog.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    console.log(formData);
  };
  return (
    <form className='create-blog-form-container' onSubmit={handleSubmit}>
      {/* Title */}
      <InputComponent
        label={'Title'}
        type={'text'}
        id={'title'}
        name={'title'}
        value={formData.title}
        onChange={handleInputChange}
        className={`${getInputClass('title')}`}
        error={errors.title}
      />
      {/* {errors.title && <span className='error-message'>{errors.title}</span>} */}
      {/* Excerpt */}
      <InputComponent
        label={'Excerpt (brief description).'}
        type={'textarea'}
        id={'excerpt'}
        name={'excerpt'}
        value={formData.excerpt}
        onChange={handleInputChange}
        className={`${getInputClass('excerpt')} create-blog-excerpt-f`}
        error={errors.excerpt}
        rows={5}
      />
      {/* category */}
      <InputComponent
        label={'Category'}
        type={'select'}
        id={'category'}
        name={'category'}
        value={formData.category}
        onChange={handleInputChange}
        className={`${getInputClass('category')} create-blog-select-category`}
        error={errors.category}
      />
      {/* Content */}
      <InputComponent
        label={'Content'}
        type={'textarea'}
        id={'content'}
        name={'content'}
        value={formData.content}
        onChange={handleInputChange}
        className={`${getInputClass('content')} create-blog-content-f`}
        error={errors.content}
      />
      {/* Add Image */}
      <div className='form-group create-blog-file-container'>
        <label>Image</label>
        <span>(aspect ratios: 16:9 suits the best.)</span>
        <input
          className='create-blog-fileInput'
          type='file'
          name='heroImage'
          id='heroImage'
          accept='image/*'
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        {errors.heroImage && (
          <p className='error-message'>{errors.heroImage}</p>
        )}
        {/* <InputComponent
          type='file'
          id='heroImage'
          label='Image'
          value={formData.heroImage}
          onChange={handleImageChange}
          ref={fileInputRef}
          accept='image/*'
          className={`${getInputClass('content')} create-blog-fileinput`}
          error={errors.heroImage}
        /> */}

        {selectedImage && (
          <div className='create-blog-preview-img'>
            <img
              src={selectedImage}
              alt='selectedImage'
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
            <div className='form-group'>
              <button onClick={handleRemoveImage} className=''>
                Remove Image
              </button>
            </div>
          </div>
        )}
      </div>
      {/* submit */}
      <div className='create-blog-form-sub-btn'>
        <button className='submit-button'>Add</button>
      </div>
    </form>
  );
};

export default CreateBlogForm;
