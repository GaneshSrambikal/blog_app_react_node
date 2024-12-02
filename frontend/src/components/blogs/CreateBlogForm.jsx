import { useContext, useRef, useState } from 'react';
import InputComponent from '../ui/InputComponent';
import { validateCreateBlogForm } from '../../validators/blog/createBlogValidator';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Oval } from 'react-loader-spinner';
import { SiGooglegemini } from 'react-icons/si';
import { model } from '../../utils/gemini-ai';
import { validateGeminiInput } from '../../validators/blog/geminiValidator';
import { Link } from 'react-router-dom';
const CreateBlogForm = ({ ...props }) => {
  const fileInputRef = useRef(null);
  const { token, user, loadUser } = useContext(AuthContext);
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
  const [aiLoading, setAiLoading] = useState(false);
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
    // console.log(formData, selectedImage);
    const validationErrors = validateCreateBlogForm(formData);
    if (validationErrors) {
      // console.log(validationErrors);
      setErrors(validationErrors);
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
        // console.log(URL.revokeObjectURL(formData.heroImage));
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
        props.handleNewLink(newBlog.data.id);
        setIsLoading(false);
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          category: '',
          heroImage: null,
        });
        handleRemoveImage();
        props.handleSuccess();
        // update user rewards for creating blog. Rewards: 10
        await axios.post(
          `${react_base_url}/users/update-rewards`,
          {
            rewardType: 'blog',
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
    console.log(formData);
  };
  const handleAIOutput = async () => {
    setAiLoading(true);
  
    const validationErrors = validateGeminiInput(
      formData.title,
      formData.category
    );
    if (validationErrors) {
      setErrors(validationErrors);
      setAiLoading(false);
    } else {
      try {
        const res = await model.generateContent(
          `Write a short blog on ${formData.title} and based on category ${formData.category} . Return response in plain text`
        );
        setAiLoading(false);
        
        setFormData(formData, (formData.content = res.response.text()));
        // update user credits and successfully creating content. Each new generate spends 20 credits
        await axios.post(
          `${react_base_url}/users/update-credits`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        loadUser();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {/* <Modal /> */}
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
          label={`Excerpt (brief description. max characters 250). (${formData.excerpt.length}/250)`}
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
          disabled={aiLoading}
        />
        <label>
          {`Or generate content with Google's Gemini`}{' '}
          <span
            className='create-blog-ai-credits-label'
            style={{ color: user?.totalAiCredits < 20 ? 'red' : '#3a50cc' }}
          >{`(${user?.totalAiCredits} credits left)`}</span>
        </label>{' '}
        <button
          type='button'
          onClick={handleAIOutput}
          className={`create-blog-ai-gen-btn ${
            user?.totalAiCredits < 20 && 'cb-ai-disabled'
          }`}
          disabled={user?.totalAiCredits < 20 && true}
        >
          {aiLoading ? (
            <>
              <Oval
                visible={isLoading}
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
        {user?.totalAiCredits < 20 && (
          <span className='create-blog-buy-credits-span'>
            <Link to={`/dashboard`}>buy more credits now!</Link>
          </span>
        )}
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
        {errors.server && <span>{errors.server}</span>}
        {/* submit */}
        <div className='create-blog-form-sub-btn'>
          <button className='submit-button' disabled={isLoading || aiLoading}>
            {isLoading ? (
              <>
                <Oval
                  visible={isLoading}
                  height='20'
                  width='20'
                  color='#fff'
                  ariaLabel='oval-loading'
                  wrapperStyle={{}}
                  wrapperClass=''
                />{' '}
                <span style={{ marginLeft: '1rem' }}>
                  {' '}
                  Creating new Blog . . .
                </span>
              </>
            ) : (
              `Add`
            )}
          </button>
        </div>
      </form>
      {/* {activate && <ConfettiWrapper />} */}
    </>
  );
};

export default CreateBlogForm;
