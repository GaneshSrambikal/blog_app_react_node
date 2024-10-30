// import React from 'react'
import { Link } from 'react-router-dom';
const ProfileConnections = () => {
  return (
    <div className='profile-connections-container'>
      <h2>John's connections</h2>
      <div className='profile-connections-c-followers-c'>
        <h3>Followers</h3>
        <div className='profile-connections-c-followers-cs'>
          <div className='profile-connections-card-c'>
            <div className='profile-connections-card-avatar-c'>
              <p>Avatar</p>
            </div>
            <div className='profile-connections-card-u-info'>
              <div className='profile-connections-card-u-info-name'>
                <Link to='/users/id'>
                  <p>Name</p>
                </Link>
                <span>Title</span>
              </div>
              <div className='profile-connections-card-u-info-action-btn-c'>
                <button>Following</button>
              </div>
            </div>
          </div>
          <div className='profile-connections-card-c'>
            <div className='profile-connections-card-avatar-c'>
              <p>Avatar</p>
            </div>
            <div className='profile-connections-card-u-info'>
              <div className='profile-connections-card-u-info-name'>
                <Link to='/users/id'>
                  <p>Name</p>
                </Link>
                <span>Title</span>
              </div>
              <div className='profile-connections-card-u-info-action-btn-c'>
                <button>Following</button>
              </div>
            </div>
          </div>
          <div className='profile-connections-card-c'>
            <div className='profile-connections-card-avatar-c'>
              <p>Avatar</p>
            </div>
            <div className='profile-connections-card-u-info'>
              <div className='profile-connections-card-u-info-name'>
                <Link to='/users/id'>
                  <p>Name</p>
                </Link>
                <span>Title</span>
              </div>
              <div className='profile-connections-card-u-info-action-btn-c'>
                <button>Following</button>
              </div>
            </div>
          </div>
          <div className='profile-connections-card-c'>
            <div className='profile-connections-card-avatar-c'>
              <p>Avatar</p>
            </div>
            <div className='profile-connections-card-u-info'>
              <div className='profile-connections-card-u-info-name'>
                <Link to='/users/id'>
                  <p>Name</p>
                </Link>
                <span>Title</span>
              </div>
              <div className='profile-connections-card-u-info-action-btn-c'>
                <button>Following</button>
              </div>
            </div>
          </div>
          <div className='profile-connections-card-c'>
            <div className='profile-connections-card-avatar-c'>
              <p>Avatar</p>
            </div>
            <div className='profile-connections-card-u-info'>
              <div className='profile-connections-card-u-info-name'>
                <Link to='/users/id'>
                  <p>Name</p>
                </Link>
                <span>Title</span>
              </div>
              <div className='profile-connections-card-u-info-action-btn-c'>
                <button>Following</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Following</h3>
      </div>
    </div>
  );
};

export default ProfileConnections;
