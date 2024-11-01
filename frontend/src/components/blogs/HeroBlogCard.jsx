// import React from 'react'
import { getInitials } from '../../utils/formatNames';
import { Link } from 'react-router-dom';
import { MdOutlineAccessTime } from 'react-icons/md';
import { FaArrowCircleRight } from 'react-icons/fa';
const HeroBlogCard = ({ blog }) => {
  if (!blog) return <div>loading</div>;
  return (
    <div className='hero-blog-card-c'>
      <div className='hero-blog-card-image-c'>
        <img src={blog?.heroImage} alt='hero-blog-image' />
      </div>
      <div className='hero-blog-card-content-c'>
        <div className='hero-blog-card-tags-reading'>
          <div className='hero-blog-card-tag-c'>
            <span>{blog?.category}</span>
          </div>
          <div className='hero-blog-card-reading-c'>
            {' '}
            <MdOutlineAccessTime /> <span>{` ${blog?.readingTime} min`}</span>
          </div>
          <div></div>
        </div>
        <div className='hero-blog-card-title-content'>
          <h2>{blog?.title}</h2>
          <p>{blog?.excerpt}</p>
        </div>
        <div className='hero-blog-card-user-info'>
          <div className='hbcui-img-c'>
            {blog?.author?.avatar_url?.length > 0 ? (
              <img src={blog?.author?.avatar_url} />
            ) : (
              getInitials(blog?.author?.name)
            )}
          </div>
          <div className='hbcui-info-c'>
            <p>{blog?.author?.name}</p>
            <span>Chef</span>
          </div>
        </div>
        <div className='hero-blog-card-read-link'>
          <Link to={`/blog/${blog._id}`}>
            Read more <FaArrowCircleRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBlogCard;
