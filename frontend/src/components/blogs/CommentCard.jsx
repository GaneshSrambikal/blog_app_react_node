// import React from 'react'

import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { getInitials } from '../../utils/formatNames';
import { FaCalendar } from 'react-icons/fa';
import { getCreatedDate } from '../../utils/formatDates';
import { MdDelete } from 'react-icons/md';

const CommentCard = ({ comment, ...props }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className='bm-comment-card' key={comment?._id}>
      <div className='bm-comment-card-u'>
        <div className='bm-comment-card-u-avatar'>
          {comment && comment?.author?.avatar_url.length > 0 ? (
            <img src={comment?.author?.avatar_url} alt='avatar' />
          ) : (
            <span>{getInitials(comment?.author?.name)}</span>
          )}
        </div>

        <div className='bm-comment-card-u-info-comment'>
          <div className='bm-comment-card-u-info'>
            <p>{comment?.author?.name}</p>
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
