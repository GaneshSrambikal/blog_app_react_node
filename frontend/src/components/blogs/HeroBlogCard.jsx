// import React from 'react'
import { getInitials } from '../../utils/formatNames';
import { Link } from 'react-router-dom';
import { MdOutlineAccessTime, MdOutlineCalendarMonth } from 'react-icons/md';
import { FaArrowCircleRight } from 'react-icons/fa';
import { getCreatedDate } from '../../utils/formatDates';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import AvatarPlaceholder from '../../assets/images/avatarPlaceholder.png';
import HeroBlogCardSkeleton from '../ui/skeletons/HeroBlogCardSkeleton';
const HeroBlogCard = ({ blog }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { token } = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState(AvatarPlaceholder);
  // const fetchUseAvatar = async () => {
  //   const res = await axios.get(
  //     `${base_url}/users/user/${blog?.author?.id}/get-avatar-url`,
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );
  //   setUserAvatar(res.data.avatar_url);
  // };
  const fetchUseAvatar = useCallback(async () => {
    const res = await axios.get(
      `${base_url}/users/user/${blog?.author?.id}/get-avatar-url`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUserAvatar(res.data.avatar_url);
  }, [base_url, token, blog]);
  useEffect(() => {
    fetchUseAvatar();
  }, []);
  if (!blog) return <HeroBlogCardSkeleton />;
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
            <MdOutlineAccessTime />{' '}
            <span>{` ${blog?.readingTime} min read`}</span>{' '}
            <span className='hero-blog-card-reading-c-h-divide'> | </span>
            <span>
              <MdOutlineCalendarMonth /> {getCreatedDate(blog?.createdAt)}
            </span>
          </div>
          <div></div>
        </div>
        <div className='hero-blog-card-title-content'>
          {/* <h2>{`${String(blog?.title).slice(0, 50)} ....`}</h2> */}
          <h2>{blog?.title}</h2>
          <p>{`${String(blog?.excerpt).slice(0, 80)} ....`}</p>
          {/* <p>{blog?.excerpt}</p> */}
        </div>
        <div className='hero-blog-card-user-info'>
          <div className='hbcui-img-c'>
            {blog?.author?.avatar_url?.length > 0 ? (
              <img src={userAvatar} />
            ) : (
              getInitials(blog?.author?.name)
            )}
          </div>
          <div className='hbcui-info-c'>
            <p>{blog?.author?.name}</p>
            {/* <span>Chef</span> */}
          </div>
        </div>
        <div className='hero-blog-card-read-link'>
          <Link to={`/blogs/blog/${blog._id}`}>
            Read more <FaArrowCircleRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBlogCard;
