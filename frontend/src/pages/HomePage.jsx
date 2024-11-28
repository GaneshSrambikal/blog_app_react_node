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
import HeroBlogCardSkeleton from '../components/ui/skeletons/HeroBlogCardSkeleton';
const react_base_url = import.meta.env.VITE_API_BASE_URL;
const Home = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${react_base_url}/blogs`);

      if (res) {
        setBlogs(res.data.blogs);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  if (!user) return <Navigate to='/login' />;
  // if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Helmet>
        <title>Home | Blogshpere</title>
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
          {isLoading && <HeroBlogCardSkeleton />}
          {!isLoading && (
            <Carousel>
              {blogs &&
                blogs.slice(0, 6).map((blog, index) => (
                  <div className='homepage-carousel-slide' key={index}>
                    <HeroBlogCard blog={blog} />
                  </div>
                ))}
            </Carousel>
          )}
        </div>

        <FilterSearchTabs blogs={blogs} />

        {/* </div> */}
        {/* <div className='homepage-right-c'>right</div> */}
      </div>
    </>
  );
};

export default Home;
