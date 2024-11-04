import { useState } from 'react';
import CreateBlogForm from '../../components/blogs/CreateBlogForm';
import Modal from '../../components/ui/modal';
import '../../styles/createblogpage.css';
const CreateBlogPage = () => {
  const [success, setSuccess] = useState(false);
  const [newBlogLink, setNewBlogLink] = useState('');
  const handleSuccess = () => {
    setSuccess(!success);
    console.log('success called', success);
  };
  const handleNewLink = (link) => {
    setNewBlogLink(`/blog/${link}`);
    console.log('link called', newBlogLink);
  };
  return (
    <>
      <div className='create-blog-container'>
        <div className='create-blog-header'>
          <h1>New Blog</h1>
        </div>
        <div className='create-blog-form-c'>
          <CreateBlogForm
            success={success}
            handleSuccess={handleSuccess}
            handleNewLink={handleNewLink}
          />
        </div>
      </div>
      {success && (
        <Modal
          confetti={true}
          svgType={'success'}
          headerTitle={'Blog Added Successfully'}
          promptTitle={'Do you want to ?'}
          btnProps={{ text: 'view new blog', link: newBlogLink }}
          handleSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default CreateBlogPage;
