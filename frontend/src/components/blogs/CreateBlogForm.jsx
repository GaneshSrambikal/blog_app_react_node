import { useContext, useRef, useState } from 'react';
import InputComponent from '../ui/InputComponent';
import { validateCreateBlogForm } from '../../validators/blog/createBlogValidator';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Oval } from 'react-loader-spinner';
const CreateBlogForm = () => {
  const fileInputRef = useRef(null);
  const { token } = useContext(AuthContext);
  const react_base_url = import.meta.env.VITE_API_BASE_URL;
  const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
  const c_upload_url = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    heroImage: null,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleImageChange = () => {
    setErrors({});
    if (fileInputRef.current.files[0]) {
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
    setIsLoading(true);
    console.log(formData, selectedImage);
    const validationErrors = validateCreateBlogForm(formData);
    if (validationErrors) {
      console.log(validationErrors);
      setErrors(validationErrors);
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
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
          type='file'
          name='heroImage'
          id='heroImage'
          accept='image/*'
          onChange={handleImageChange}
          ref={fileInputRef}
          className={`${getInputClass('heroImage')} create-blog-fileInput`}
        />
        {errors.heroImage && (
          <p className='error-message'>{errors.heroImage}</p>
        )}

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
        <button className='submit-button' disabled={isLoading}>
          {isLoading ? (
            <Oval
              visible={isLoading}
              height='20'
              width='20'
              color='#fff'
              ariaLabel='oval-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          ) : (
            `Add`
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateBlogForm;
