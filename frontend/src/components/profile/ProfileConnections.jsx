import ProfileConnectionCard from './ProfileConnectionCard';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
const ProfileConnections = ({ user }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { loading, token } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  console.log(user, token);
  const fetchFollower = async () => {
    try {
      const res = await axios.get(`${base_url}/users/${user._id}/followers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      setFollowers(res.data.followers);
      return res.data.followers;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFollowing = async () => {
    try {
      const res = await axios.get(`${base_url}/users/${user._id}/following`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      setFollowing(res.data.following);
      return res.data.following;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFollower();
    fetchFollowing();
  }, []);
  console.log(followers, following);
  if (loading) return <div>loading</div>;
  return (
    <div className='profile-connections-container'>
      <h2>{`${user.name.split(' ')[0]}'s connections`}</h2>
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
