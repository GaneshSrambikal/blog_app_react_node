import ProfileComponent from '../../components/profile/ProfileComponent';
import { useContext, useEffect, useState } from 'react';
import '../../styles/profile.css';
import AuthContext from '../../context/AuthContext';
import ProfileTabs from '../../components/profile/ProfileTabs';
import { Helmet } from 'react-helmet';
import ProfileSkeleton from '../../components/ui/skeletons/ProfileSkeleton';
const ProfilePage = () => {
  const { user, loadUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  //   const [blogs, setBlogs] = useState([]);

  //   const fetchUser = await axios.get;
  user && console.log(user);
  useEffect(() => {
    loadUser();
    setLoading(false);
  }, []);

  if (loading) return <ProfileSkeleton />;
  return (
    <>
      <Helmet>
        <title>{user?.name} | Profile | Blog_app</title>
      </Helmet>
      <div className='user-profile-container'>
        <ProfileComponent user={user} />
        <ProfileTabs user={user} />
      </div>
    </>
  );
};

export default ProfilePage;
