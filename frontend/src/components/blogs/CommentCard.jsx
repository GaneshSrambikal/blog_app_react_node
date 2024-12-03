// import React from 'react'

import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { getInitials } from '../../utils/formatNames';
import { FaCalendar } from 'react-icons/fa';
import { getCreatedDate } from '../../utils/formatDates';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AvatarPlaceholder from '../../assets/images/avatarPlaceholder.png';

const CommentCard = ({ comment, ...props }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { user, token } = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState(AvatarPlaceholder);

  const fetchUseAvatar = async () => {
    const res = await axios.get(
      `${base_url}/users/user/${comment?.author?.id}/get-avatar-url`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(res.data);
    setUserAvatar(res.data.avatar_url);
    // return currentAvatar;
    
  };
  useEffect(() => {
    fetchUseAvatar();
  }, []);
  return (
    <div className='bm-comment-card' key={comment?._id}>
      <div className='bm-comment-card-u'>
        <div className='bm-comment-card-u-avatar'>
          {comment && comment?.author?.avatar_url.length > 0 ? (
            <img src={userAvatar} alt='avatar' />
          ) : (
            <span>{getInitials(comment?.author?.name)}</span>
          )}
        </div>

        <div className='bm-comment-card-u-info-comment'>
          <div className='bm-comment-card-u-info'>
            <p>
              <Link to={`/profile/${comment?.author?.id}`}>
                {comment?.author?.name}
              </Link>
            </p>
            <span>
              <FaCalendar />
              {comment && getCreatedDate(comment?.createdAt)}
            </span>
          </div>
          <div className='bm-comment-card-u-content-c'>
            <div className='bm-comment-card-u-content'>
              <p>{comment?.text}</p>
            </div>
            {user?._id === comment?.author?.id && (
              <div className='bm-comment-card-u-action'>
                <button
                  onClick={() => props.handleDeleteComment(comment?._id)}
                  disabled={props.isLoading}
                >
                  <MdDelete /> delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
