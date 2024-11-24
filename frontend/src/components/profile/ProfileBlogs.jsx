// import React from 'react'

import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import ProfileBlogCard from './ProfileBlogCard';
import DeleteModal from '../ui/DeleteModal';
import { useToast } from '../../context/ToastContext';
import ProfileBlogSkeleton from '../ui/skeletons/ProfileBlogSkeleton';
const react_base_url = import.meta.env.VITE_API_BASE_URL;
const ProfileBlogs = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
  const [selectedBlog, setSelectedBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const addToast = useToast();
  console.log('Blogs', blogs);
  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${react_base_url}/blogs`);
      console.log(res.data);
      if (res) {
        const userBlogs = res.data.blogs.filter(
          (blog) => blog.author.id === props.user._id
        );
        setBlogs(userBlogs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleModal = (blogId) => {
    setShowModal(!showModal);
    setSelectedBlog(blogId);
    console.log(blogId);
  };
  const handleDelete = async () => {
    console.log(user.id);
    console.log('delete');
    setIsLoading(true);

    try {
      const blog = await axios.delete(
        `${react_base_url}/blogs/blog/${selectedBlog}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBlog();
      console.log(blog.data);
      setIsLoading(false);
      handleModal();
      addToast('Blog deleted successfully', 'toast-success');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  if (isLoading) return <ProfileBlogSkeleton />;
  return (
    <>
      <div className='profile-blogs-container'>
        <h2>{`${props.user.name.split(' ')[0]}'s`} Blogs</h2>
        <div className='profile-blogs-c'>
          <ul>
            {blogs &&
              blogs.map((blog, index) => (
                <li key={index}>
                  <ProfileBlogCard
                    blog={blog}
                    showModal={showModal}
                    handleModal={handleModal}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <DeleteModal
          svgType={'delete'}
          headerTitle={'Delete Blog'}
          promptTitle={'Do you want to delete this blog ?'}
          btnProps={{ text: 'delete', link: '' }}
          handleModal={handleModal}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ProfileBlogs;
