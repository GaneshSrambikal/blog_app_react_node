import ProfileConnectionCard from './ProfileConnectionCard';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
const ProfileConnections = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>loading</div>;
  console.log(user);
  return (
    <div className='profile-connections-container'>
      <h2>{`${user.name.split(' ')[0]}'s connections`}</h2>
      {/* Followers */}
      <div className='profile-connections-c-f-c'>
        <h3>Followers</h3>
        <div className='profile-connections-c-f-cs'>
          <ProfileConnectionCard />
          <ProfileConnectionCard />
          <ProfileConnectionCard />
          <ProfileConnectionCard />
        </div>
      </div>
      {/* Following */}
      <div className='profile-connections-c-f-c'>
        <h3>Following</h3>
        <div className='profile-connections-c-f-cs'>
          <ProfileConnectionCard />
          <ProfileConnectionCard />
          <ProfileConnectionCard />
          <ProfileConnectionCard />
        </div>
      </div>
    </div>
  );
};

export default ProfileConnections;
