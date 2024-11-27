import ProfileConnectionCard from './ProfileConnectionCard';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import ProfileConnectionSkeleton from '../ui/skeletons/ProfileConnectionSkeleton';
const ProfileConnections = ({ ...props }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { token } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollower = async () => {
    try {
      const res = await axios.get(
        `${base_url}/users/${props.user._id}/followers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFollowers(res.data.followers);
      setIsLoading(false);
      return res.data.followers;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFollowing = async () => {
    try {
      const res = await axios.get(
        `${base_url}/users/${props.user._id}/following`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFollowing(res.data.following);
      setIsLoading(false);
      return res.data.following;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFollower();
    fetchFollowing();
  }, [props.user]);

  if (isLoading) return <ProfileConnectionSkeleton />;
  return (
    <div className='profile-connections-container'>
      <h2>{`${props.user.name.split(' ')[0]}'s connections`}</h2>
      {/* Followers */}
      <div className='profile-connections-c-f-c'>
        <h3>Followers</h3>
        <div className='profile-connections-c-f-cs'>
          {followers.length > 0 ? (
            followers.map((follower, index) => (
              <ProfileConnectionCard data={follower} key={index} />
            ))
          ) : (
            <p style={{ color: 'gray' }}>{`${followers.length} followers`}</p>
          )}
        </div>
      </div>
      {/* Following */}
      <div className='profile-connections-c-f-c'>
        <h3>Following</h3>
        <div className='profile-connections-c-f-cs'>
          {following.length > 0 ? (
            following.map((follower, index) => (
              <ProfileConnectionCard data={follower} key={index} />
            ))
          ) : (
            <p style={{ color: 'gray' }}>{`${following.length} following`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileConnections;
