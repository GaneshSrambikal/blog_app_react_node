import { useState, useEffect, useContext } from 'react';
import '../../styles/profile.css';
import AuthContext from '../../context/AuthContext';
import { getJoinedDate } from '../../utils/formatDates';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const ProfileComponent = ({ ...props }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { loading, user, token } = useContext(AuthContext);
  const params = useParams();
  const [profile, setProfile] = useState(props.user);
  const [isFollow, setIsFollow] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  console.log(
    `Profile Components: ${profile?.followers?.includes(params.id)} `
  );
  console.log(profile.followers.includes(user._id), user._id, profile._id);

  const fetchFollower = async () => {
    try {
      const res = await axios.get(
        `${base_url}/users/${props.user._id}/followers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setFollowers(res.data.followers);
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
      console.log(res);
      setFollowing(res.data.following);
      return res.data.following;
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async () => {
    try {
      await axios.post(`${base_url}/users/${profile._id}/follow`, '', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('followed this user');
      await fetchFollower();
      await fetchFollowing();
      setIsFollow(true);
      console.log(followers);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnFollow = async () => {
    try {
      await axios.post(`${base_url}/users/${profile._id}/unfollow`, '', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('un followed this user');
      await fetchFollower();
      await fetchFollowing();
      setIsFollow(false);
      console.log(props.user);
    } catch (error) {
      console.log(error);
    }
  };
  const isFollowing = () => {
    if (profile.followers.includes(user._id)) {
      setIsFollow(true);
    }
  };
  useEffect(() => {
    setProfile(props.user);
    fetchFollower();
    fetchFollowing();
    isFollowing();
  }, [props.user, profile]);
  if (loading) return <div>loading...</div>;
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
              <p>{followers?.length}</p>
              <p>followers</p>
            </div>
            <div>
              <p>{following?.length}</p>
              <p>following</p>
            </div>
            <div>
              <p>{0}</p>
              <p>posts</p>
            </div>
          </div>
          <div className='pc-user-details-edit-btn-c'>
            {props.user._id === user._id ? (
              <Link to='/profile/edit' type='button' className='submit-button'>
                Edit Profile
              </Link>
            ) : isFollow ? (
              <button className='submit-button' onClick={handleUnFollow}>
                Following
              </button>
            ) : (
              <button className='submit-button' onClick={handleFollow}>
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
