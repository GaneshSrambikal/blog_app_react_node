// import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getInitials } from '../../utils/formatNames';
const ProfileConnectionCard = ({ data }) => {
  const { user } = useContext(AuthContext);
  console.log(data);
  return (
    <div className='profile-connections-card-c'>
      <div className='profile-connections-card-avatar-c'>
        {/* <p>Avatar</p> */}
        {data?.avatar_url.length > 0 ? (
          <img src={data?.avatar_url} alt='avatar' />
        ) : (
          <p>{getInitials(data?.name)}</p>
        )}
      </div>
      <div className='profile-connections-card-u-info'>
        <div className='profile-connections-card-u-info-name'>
          {data?._id == user._id ? (
            <>
              <Link to={`/profile`}>
                <p>{data?.name}</p>
              </Link>
              <span>{data?.title}</span>
            </>
          ) : (
            <>
              <Link to={`/profile/${data?._id}`}>
                <p>{data?.name}</p>
              </Link>
              <span>{data?.title}</span>
            </>
          )}
        </div>
        {/* <div className='profile-connections-card-u-info-action-btn-c'>
          <button>Follow</button>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileConnectionCard;
