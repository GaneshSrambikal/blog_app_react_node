// 2import React from 'react';

import { useEffect, useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ProfileDetails = ({ user }) => {
  const { loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  console.log('Blogs', blogs);
  const react_base_url = import.meta.env.VITE_API_BASE_URL;
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
  useEffect(() => {
    fetchBlog();
  }, []);
  if (loading) return <div>Loading</div>;
  if (!user) return <div>Loading</div>;
  return (
    <div className='profile-details-c'>
      {/* <h2>ProfileDetails</h2> */}
      <div className='profile-details-about-c'>
        <h3>About Me</h3>
        { user?.about?.length > 0 ? (
          <p>{user?.about}</p>
        ) : (
          <p style={{ color: 'gray' }}>Edit Profile to add About.</p>
        )}
      </div>
      <div className='profile-details-about-c'>
        <h3>Recent Blogs</h3>
        {blogs
          .reverse()
          .slice(0, 3)
          .map((blog, index) => (
            <p key={index}>
              <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ProfileDetails;
