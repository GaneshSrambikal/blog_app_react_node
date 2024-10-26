// import React from 'react'

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  console.log(user);
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
  if (!blogs) return <div>Loading...</div>;
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <h1>Home</h1>
        <h2>Welcome, {user?.name}</h2>
        <ul>
          {blogs.map((blog, index) => {
            return <li key={index}>{blog.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
