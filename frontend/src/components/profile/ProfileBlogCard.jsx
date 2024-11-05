// import React from 'react'
import { FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getJoinedDate } from '../../utils/formatDates';
import { getInitials } from '../../utils/formatNames';

import { MdDelete, MdEdit } from 'react-icons/md';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
const ProfileBlogCard = ({ blog, ...props }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className='profile-blogs-card-c'>
      <div className='profile-b-card-header'>
        <div className='profile-b-card-avatar'>
          {blog.author.avatar_url.length < 1 ? (
            getInitials(blog.author.name)
          ) : (
            <img src={blog.author.avatar_url} alt='author_avatar' />
          )}
        </div>
        <div className='profile-b-card-u-info'>
          <Link to={`/profile/${blog.author.id}`}>
            <p>{blog.author.name}</p>
          </Link>
          <p>{getJoinedDate(blog.createdAt)}</p>
        </div>
      </div>
      <div className='profile-b-card-body'>
        <h2>
          <Link to={`/blogs/blog/${blog._id}`}>{blog.title}</Link>
        </h2>
        <div className='profile-b-card-footer'>
          <div className='pb-c-f-like-comment'>
            <div>
              <FaRegHeart />
              {`${blog.likes.length} likes`}
            </div>
            <div>
              <FaRegCommentAlt />
              {`${blog.comments.length} Comments`}
            </div>
          </div>
          {blog?.author?.id === user._id && (
            <div className='pb-c-f-actions'>
              <Link to={`/blogs/blog/edit/${blog?._id}`}>
                <MdEdit />
              </Link>
              <button onClick={() => props.handleModal(blog._id)}>
                <MdDelete />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBlogCard;
