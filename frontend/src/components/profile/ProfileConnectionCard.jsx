// import React from 'react'
import { Link } from 'react-router-dom';
const ProfileConnectionCard = () => {
  return (
    <div className='profile-connections-card-c'>
      <div className='profile-connections-card-avatar-c'>
        {/* <p>Avatar</p> */}
        <img src='https://avatar.iran.liara.run/public/30' alt="avatar"/>
      </div>
      <div className='profile-connections-card-u-info'>
        <div className='profile-connections-card-u-info-name'>
          <Link to='/users/id'>
            <p>John Mathew</p>
          </Link>
          <span>Senior Software Engineer</span>
        </div>
        <div className='profile-connections-card-u-info-action-btn-c'>
          <button>Following</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileConnectionCard;
