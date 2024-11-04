// import React from 'react'

import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import ProfileBlogCard from './ProfileBlogCard';
import Modal from '../ui/modal';
const react_base_url = import.meta.env.VITE_API_BASE_URL;
const ProfileBlogs = () => {
  const { user, loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  console.log('Blogs', blogs);
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${react_base_url}/blogs`);
      console.log(res.data);
      if (res) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  if (loading) return <div>loading...</div>;
  return (
    <>
      <div className='profile-blogs-container'>
        <h2>{`${user.name.split(' ')[0]}'s`} Blogs</h2>
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
        <Modal
          confetti={false}
          svgType={'delete'}
          headerTitle={'Delete Blog'}
          promptTitle={'Do you want to delete this blog ?'}
          btnProps={{ text: 'delete', link: '' }}
        />
      )}
    </>
  );
};

export default ProfileBlogs;
