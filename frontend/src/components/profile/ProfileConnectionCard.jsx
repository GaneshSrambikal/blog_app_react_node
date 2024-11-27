// import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getInitials } from '../../utils/formatNames';
import AvatarPlaceHolder from '../../assets/images/avatarPlaceholder.png';
import axios from 'axios';
const ProfileConnectionCard = ({ data }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { user, token } = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState(AvatarPlaceHolder);
  
  const fetchUseAvatar = async () => {
    const res = await axios.get(
      `${base_url}/users/user/${data._id}/get-avatar-url`,
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
  return (
    <div className='profile-connections-card-c'>
      <div className='profile-connections-card-avatar-c'>
        {/* <p>Avatar</p> */}
        {data?.avatar_url.length > 0 ? (
          <img src={userAvatar} alt='avatar' />
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
