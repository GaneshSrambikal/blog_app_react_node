// import React from 'react'
import { FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getJoinedDate } from '../../utils/formatDates';
import { getInitials } from '../../utils/formatNames';
import AvatarPlaceholder from '../../assets/images/avatarPlaceholder.png';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
const ProfileBlogCard = ({ blog, ...props }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { user, token } = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState(AvatarPlaceholder);
  const fetchUseAvatar = async () => {
    const res = await axios.get(
      `${base_url}/users/user/${blog?.author?.id}/get-avatar-url`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
   
    setUserAvatar(res.data.avatar_url);
    // return currentAvatar;
  };
  useEffect(() => {
    fetchUseAvatar();
  }, []);
  if(!blog) return <div>loading...</div>
  return (
    <div className='profile-blogs-card-c'>
      <div className='profile-b-card-header'>
        <div className='profile-b-card-avatar'>
          {blog.author.avatar_url.length < 1 ? (
            getInitials(blog.author.name)
          ) : (
            <img src={userAvatar} alt='author_avatar' />
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
