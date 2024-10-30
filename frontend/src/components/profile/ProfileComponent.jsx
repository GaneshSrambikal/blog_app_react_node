import { useState, useEffect } from 'react';
import '../../styles/profile.css';
import { getJoinedDate } from '../../utils/formatDates';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { Link, useParams } from 'react-router-dom';
const ProfileComponent = ({ user }) => {
  const params = useParams();
  const [profile, setProfile] = useState(user);
  console.log(`Profile Components: ${profile} `);
  useEffect(() => {
    setProfile(user);
  }, [user]);
  return (
    <>
      <div className='profile-c-container'>
        <div className='profile-c-avatar-circle'>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt='profile-avatar' />
          ) : (
            profile.name
              .split(' ')
              .map((n) => n[0])
              .join('')
          )}
        </div>
        <div className='profile-c-user-details'>
          <h1>{profile.name}</h1>
          <p>{profile.title}</p>
          <div className='pc-user-details-loctn'>
            <div>
              <CiLocationOn />
              <p>{profile.address}</p>
            </div>
            <div>
              <CiCalendar />
              <p>Joined {getJoinedDate(profile.joined)}</p>
            </div>
          </div>
          <div className='pc-user-details-connections'>
            <div>
              <p>{user.followers.length}</p>
              <p>followers</p>
            </div>
            <div>
              <p>{user.following.length}</p>
              <p>following</p>
            </div>
            <div>
              <p>{10000}</p>
              <p>posts</p>
            </div>
          </div>
          <div className='pc-user-details-edit-btn-c'>
            {params.id === user.id ? (
              <Link to='/profile/edit' type='button' className='submit-button'>
                Edit Profile
              </Link>
            ) : user.following.includes(params.id) ? (
              <button className='submit-button'>Following</button>
            ) : (
              <button className='submit-button'>Follow</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
