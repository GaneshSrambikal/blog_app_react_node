// import React from 'react'

import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
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
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {blogs.map((blog, index) => {
          return <li key={index}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
