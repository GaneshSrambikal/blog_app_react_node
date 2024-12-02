// 2import React from 'react';

import { useEffect, useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ProfileDetails = ({ ...props }) => {
  const { loading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const react_base_url = import.meta.env.VITE_API_BASE_URL;
  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${react_base_url}/blogs`);
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
  useEffect(() => {
    fetchBlog();
  }, []);
  if (loading) return <div>Loading</div>;
  // if (!user) return <div>Loading</div>;
  return (
    <div className='profile-details-c'>
      {/* <h2>ProfileDetails</h2> */}
      <div className='profile-details-about-c'>
        <h3>About Me</h3>
        {props.user?.about?.length > 0 ? (
          <p>{props.user?.about}</p>
        ) : (
          <p style={{ color: 'gray' }}>Edit Profile to add About.</p>
        )}
      </div>
      <div className='profile-details-about-c'>
        <h3>Recent Blogs</h3>
        {isLoading ? (
          <>loading..</>
        ) : (
          <>
            {blogs.length > 0 ? (
              blogs.slice(0, 3).map((blog, index) => (
                <p key={index}>
                  <Link to={`/blogs/blog/${blog._id}`}>{blog.title}</Link>
                </p>
              ))
            ) : (
              <p>no blog posts.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
