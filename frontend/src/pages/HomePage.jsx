// import React from 'react'

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
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
      <div>
        <h1>Home</h1>
        <h2>Welcome, {user?.name}</h2>
        {blogs && (
          <ul>
            {blogs.map((blog, index) => {
              return <li key={index}>{blog.title}</li>;
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Home;
