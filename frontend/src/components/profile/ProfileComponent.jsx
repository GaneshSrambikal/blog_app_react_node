import { useState, useEffect, useContext } from 'react';
import '../../styles/profile.css';
import AuthContext from '../../context/AuthContext';
import { getJoinedDate } from '../../utils/formatDates';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
const ProfileComponent = ({ ...props }) => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { loading, user, token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(props.user);
  const [isFollow, setIsFollow] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [blogsCount, setBlogsCount] = useState(0);

  const fetchUserBlog = async () => {
    try {
      const blogs = await axios.get(`${base_url}/blogs`);
      if (blogs) {
        const userBlog = blogs.data.blogs.filter(
          (blog) => blog.author.id === props.user._id
        );
        setBlogsCount(userBlog.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFollower = async () => {
    try {
      const res = await axios.get(
        `${base_url}/users/${props.user._id}/followers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

      setFollowing(res.data.following);
      return res.data.following;
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${base_url}/users/${profile._id}/follow`, '', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('followed this user');
      await fetchFollower();
      await fetchFollowing();
      setIsFollow(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleUnFollow = async () => {
    try {
      setIsLoading(true);

      await axios.post(`${base_url}/users/${profile._id}/unfollow`, '', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('un followed this user');
      await fetchFollower();
      await fetchFollowing();
      setIsFollow(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };
  const isFollowing = () => {
    if (profile?.followers?.includes(user._id)) {
      setIsFollow(true);
    }
  };
  useEffect(() => {
    setProfile(props.user);
    fetchFollower();
    fetchFollowing();
    isFollowing();
    fetchUserBlog();
  }, [props.user, profile]);
  if (loading) return <div>loading...</div>;
  return (
    <>
      <div className='profile-c-container'>
        <div className='profile-c-avatar-circle'>
          {profile?.avatar_url ? (
            <img src={profile?.avatar_url} alt='profile-avatar' />
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
              <p>{followers?.length || 0}</p>
              <p>followers</p>
            </div>
            <div>
              <p>{following?.length || 0}</p>
              <p>following</p>
            </div>
            <div>
              <p>{blogsCount || 0}</p>
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
                {isLoading ? (
                  <Oval
                    visible={isLoading}
                    height='20'
                    width='20'
                    color='#fff'
                    ariaLabel='oval-loading'
                    wrapperStyle={{}}
                    wrapperClass=''
                  />
                ) : (
                  `Following`
                )}
              </button>
            ) : (
              <button className='submit-button' onClick={handleFollow}>
                {isLoading ? (
                  <Oval
                    visible={isLoading}
                    height='20'
                    width='20'
                    color='#fff'
                    ariaLabel='oval-loading'
                    wrapperStyle={{}}
                    wrapperClass=''
                  />
                ) : (
                  `Follow`
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
