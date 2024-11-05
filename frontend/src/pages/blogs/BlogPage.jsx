import { Link, useParams } from 'react-router-dom';
import {
  FaArrowCircleLeft,
  FaCalendar,
  FaHeart,
  FaRegComment,
  FaRegComments,
  FaRegHeart,
} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { MdOutlineAccessTime, MdEdit } from 'react-icons/md';
import { CiCalendar } from 'react-icons/ci';
import '../../styles/blogpage.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getInitials } from '../../utils/formatNames';
import AuthContext from '../../context/AuthContext';
import { getCreatedDate } from '../../utils/formatDates';
import BlogComments from '../../components/blogs/BlogComments';
const base_url = import.meta.env.VITE_API_BASE_URL;
const BlogPage = () => {
  const { loading, user, token } = useContext(AuthContext);
  const [blog, setBlog] = useState({});
  const [isloading, setIsloading] = useState(false);
  const params = useParams();
  const fetchBlog = async () => {
    setIsloading(true);
    try {
      const blog = await axios.get(`${base_url}/blogs/blog/${params.id}`);
      console.log('from blog page', blog.data.blog);
      setBlog(blog.data.blog);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };
  const handleComment = async (comment) => {
    try {
      const res = await axios.post(
        `${base_url}/blogs/${blog?._id}/comment`,
        comment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchBlog();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  if (loading || isloading)
    return (
      <div className='blogpage-container'>
        <div className='blogpage-main-c'>Blog Loading</div>
      </div>
    );
  return (
    <div className='blogpage-container'>
      <div className='blogpage-back-c'>
        <Link to='/home'>
          <FaArrowCircleLeft /> back to blogs
        </Link>
      </div>
      {user?._id === blog?.author?.id && (
        <div className='blogpage-main-action-c'>
          <Link to={`/blogs/blog/edit/${blog?._id}`}>
            <MdEdit /> Edit
          </Link>
        </div>
      )}
      <div className='blogpage-main-c'>
        {/* <div className='blogpage-m-tags-c'>
          <span className='bmtag'>{blog?.category}</span>
          <span className='bmreadt'>
            <MdOutlineAccessTime />
            {`${blog?.readingTime} min`}
          </span>
        </div>
        <div className='bm-header'>
          <h1>{blog?.title}</h1>
        </div>
        <div className='bm-user-card'>
          <div className='bm-user-card-av-c'>
            {blog?.author && blog?.author?.avatar_url?.length > 0 ? (
              <img src={blog?.author?.avatar_url} alt='avatar-image' />
            ) : (
              blog?.author && getInitials(blog?.author?.name)
            )}
          </div>
          <div className='bm-user-card-info'>
            <p>{blog?.author?.name}</p>
            <span>Chef</span>
            <span>
              <CiCalendar /> {getCreatedDate(blog?.createdAt)}
            </span>
          </div>
        </div>
        <div className='bm-image-content-c'>
          <div className='bm-hero-image'>
            <img src={blog?.heroImage} alt='hero-image' />
          </div>
          <div className='bm-excerpt'>
            <p>{blog?.excerpt}</p>
          </div>
          <div className='bm-content'>
            <p>{blog?.content}</p>
          </div>
        </div> */}
        <div className='bm-likes-comments-container'>
          <div className='bm-like-comment-c'>
            <div className='bm-like-c'>
              <FaRegHeart className='liked' />
              {`${0} Likes`}
            </div>
            <div className='bm-comment-c'>
              <FaRegComment />
              {`${0} Comments`}
            </div>
          </div>
          <BlogComments />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
