// import React from 'react'

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import '../styles/homepage.css';
import HeroBlogCard from '../components/blogs/HeroBlogCard';
const react_base_url = import.meta.env.VITE_API_BASE_URL;
const Home = () => {
  const { user, loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  console.log(user);
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
  if (!user) return <Navigate to='/login' />;
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className='homepage-container'>
        {/* <div className='homepage-left-c'> */}
        <div className='homepage-greeting'>
          <h1>Home</h1>
          <h2>Welcome 👋, {user?.name}</h2>
        </div>
        <div className='homepage-latest-post-c'>
          <h3>Latest blogs at Blog App</h3>
          {blogs &&
            blogs
              .slice(0, 2)
              .map((blog, index) => <HeroBlogCard key={index} blog={blog} />)}
        </div>
        {/* </div> */}
        {/* <div className='homepage-right-c'>right</div> */}
      </div>
    </>
  );
};

export default Home;
