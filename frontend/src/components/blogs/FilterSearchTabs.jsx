// import React from 'react'

import { FaSearch } from 'react-icons/fa';
import FilterCard from './FilterCard';
import { useState } from 'react';
import axios from 'axios';

const react_base_url = import.meta.env.VITE_API_BASE_URL;
const FilterSearchTabs = ({ blogs }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [totalFilteredBlogs, setTotalFilteredBlogs] = useState(0);


  
  const handleCategory = async (value) => {
    if (value == 'all') {
      setSearchInput('');
      setFilteredBlogs([]);
      setSelectedCategory(value);
    } else {
      setSearchInput('');
      setSelectedCategory(value);
      fetchBlogByCategory(value);
    }
  };
  const getClassName = (categoryName) => {
    return selectedCategory === categoryName ? 'selected' : '';
  };
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setTimeout(() => {
      fetchBlogByTitle(e.target.value);
    }, 600);
  };

  const fetchBlogByCategory = async (value) => {
    const res = await axios.get(
      `${react_base_url}/blogs/search/category?category=${value}`
    );
    setFilteredBlogs(res.data.blogs);
    setTotalFilteredBlogs(res.data.totalBlogs);
  };
  const fetchBlogByTitle = async () => {
    setSelectedCategory('');
    try {
      if (searchInput.length > 0) {
        const res = await axios.get(
          `${react_base_url}/blogs/search/?title=${searchInput}`
        );

        setFilteredBlogs(res.data.blogs);
        setTotalFilteredBlogs(res.data.totalBlogs);
      } else {
        setFilteredBlogs([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='homepage-filtersearch-container'>
      <div className='homepage-filter-search'>
        <div className='h-fs-filter-c'>
          <div
            className={`h-fs-filter-option ${getClassName('all')}`}
            onClick={() => handleCategory('all')}
          >
            all
          </div>
          <div
            className={`h-fs-filter-option ${getClassName('technology')}`}
            onClick={() => handleCategory('technology')}
          >
            Technology
          </div>
          <div
            className={`h-fs-filter-option ${getClassName('content creator')}`}
            onClick={() => handleCategory('content creator')}
          >
            content creator
          </div>
          <div
            className={`h-fs-filter-option ${getClassName('react')}`}
            onClick={() => handleCategory('react')}
          >
            react
          </div>
        </div>
        <div className='h-fs-search-c'>
          <input
            type='text'
            placeholder='search blogs by title, author, content'
            value={searchInput}
            onChange={handleSearchInput}
          />
          <FaSearch />
        </div>
      </div>
      {/* if category or search input is active */}
      {filteredBlogs.length > 0 ? (
        <>
          <div className='filtersearch-result-counts'>
            {searchInput.length == 0
              ? `Total blogs in ${selectedCategory}: ${totalFilteredBlogs}`
              : `Total blogs found for '${searchInput}' : ${totalFilteredBlogs}`}
          </div>
          <div
            className='homepage-filtersearch-result-container'
            style={{ minHeight: '20rem' }}
          >
            {filteredBlogs &&
              filteredBlogs.map((blog, index) => (
                <FilterCard key={index} blog={blog} />
              ))}
          </div>
        </>
      ) : (
        <div className='homepage-filtersearch-result-container'>
          {blogs &&
            blogs
              .slice(0)
              .map((blog, index) => <FilterCard key={index} blog={blog} />)}
        </div>
      )}
     
    </div>
  );
};

export default FilterSearchTabs;
