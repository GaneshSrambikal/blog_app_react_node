// import React from 'react'

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles/homepage.css';
import HeroBlogCard from '../components/blogs/HeroBlogCard';
import Carousel from '../components/ui/Carousel';
import { Navigate } from 'react-router-dom';
import FilterSearchTabs from '../components/blogs/FilterSearchTabs';
import AddBlogSection from '../components/blogs/AddBlogSection';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <title>Home | Blog_app</title>
      </Helmet>
      <div className='homepage-container'>
        {/* <div className='homepage-left-c'> */}
        <div className='homepage-greeting'>
          <h1>Home</h1>
          <h2>Welcome 👋, {user?.name}</h2>
        </div>
        <AddBlogSection />
        <div className='homepage-latest-post-c'>
          <h3>Latest blogs at Blog App</h3>
          <Carousel>
            {blogs &&
              blogs.slice(0, 6).map((blog, index) => (
                <div className='homepage-carousel-slide' key={index}>
                  <HeroBlogCard blog={blog} />
                </div>
              ))}
          </Carousel>
        </div>
        {/* <div className='homepage-filtersearch-container'>
          <div className='homepage-filter-search'>
            <div className='h-fs-filter-c'>
              <div className='h-fs-filter-option selected'>all</div>
              <div className='h-fs-filter-option'>Technology</div>
              <div className='h-fs-filter-option'>Travel</div>
              <div className='h-fs-filter-option'>Food</div>
            </div>
            <div className='h-fs-search-c'>
              <input
                type='text'
                placeholder='search blogs by title, author, date, order'
              />
              <FaSearch />
            </div>
          </div>
          <div className='homepage-filtersearch-result-container'>
            {blogs &&
              blogs
                .reverse()
                .map((blog, index) => <FilterCard key={index} blog={blog} />)}
          </div>
        </div> */}

        <FilterSearchTabs blogs={blogs} />

        {/* </div> */}
        {/* <div className='homepage-right-c'>right</div> */}
      </div>
    </>
  );
};

export default Home;
