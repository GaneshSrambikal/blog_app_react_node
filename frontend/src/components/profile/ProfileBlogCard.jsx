// import React from 'react'
import { FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getJoinedDate } from '../../utils/formatDates';
import { getInitials } from '../../utils/formatNames';
const ProfileBlogCard = ({ blog }) => {
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
          <p>{blog.author.name}</p>
          <p>{getJoinedDate(blog.createdAt)}</p>
        </div>
      </div>
      <div className='profile-b-card-body'>
        <h2>
          <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
        </h2>
        <div className='profile-b-card-footer'>
          <div>
            <FaRegHeart />
            {`${blog.likes.length} likes`}
          </div>
          <div>
            <FaRegCommentAlt />
            {`${blog.comments.length} Comments`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBlogCard;
