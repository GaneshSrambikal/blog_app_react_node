// import React from 'react'

import CreateBlogForm from '../../components/blogs/CreateBlogForm';
import '../../styles/createblogpage.css'
const CreateBlogPage = () => {
  return (
    <div className='create-blog-container'>
      <div className='create-blog-header'>
        <h1>New Blog</h1>
      </div>
      <div className='create-blog-form-c'>

      <CreateBlogForm />
      </div>
    </div>
  );
};

export default CreateBlogPage;
