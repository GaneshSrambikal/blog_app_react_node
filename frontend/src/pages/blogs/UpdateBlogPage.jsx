import '../../styles/createblogpage.css';
import UpdateBlogForm from '../../components/blogs/UpateBlogForm';


const UpdateBlogPage = () => {
  return (
    <>
    
      <div className='create-blog-container'>
        <div className='create-blog-header'>
          <h1>Update Blog</h1>
        </div>
        <div className='create-blog-form-c'>
          <UpdateBlogForm />
        </div>
      </div>
    </>
  );
};

export default UpdateBlogPage;
