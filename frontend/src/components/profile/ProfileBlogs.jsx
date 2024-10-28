// import React from 'react'

import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import ProfileBlogCard from './ProfileBlogCard';
const ProfileBlogs = () => {
  const { user, loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  console.log('Blogs', blogs);
  const fetchBlog = async () => {
    try {
      const res = await axios.get('/api/blogs');
      console.log(res.data);
      if (res) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  if (loading) return <div>loading...</div>;
  return (
    <div className='profile-blogs-container'>
      <h2>{`${user.name.split(' ')[0]}'s`} Blogs</h2>
      <div className='profile-blogs-c'>
        <ul>
          {blogs &&
            blogs.map((blog, index) => (
              <li key={index}>
                <ProfileBlogCard blog={blog} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileBlogs;
