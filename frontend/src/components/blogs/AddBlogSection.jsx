// import React from 'react'

import { MdAdd, MdPostAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AddBlogSection = () => {
  return (
    <section className='hp-add-blog-section'>
      <Link to='/blogs/blog/create-blog' className='hp-add-blog-c'>
        <MdPostAdd/>
        <p>Add new Blog post</p>
      </Link>
    </section>
  );
};

export default AddBlogSection;
