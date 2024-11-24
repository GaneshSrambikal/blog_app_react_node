import ProfileComponent from '../../components/profile/ProfileComponent';
import { useContext, useEffect, useState } from 'react';
import '../../styles/profile.css';
import AuthContext from '../../context/AuthContext';
import ProfileTabs from '../../components/profile/ProfileTabs';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import ProfileBlogSkeleton from '../../components/ui/skeletons/ProfileBlogSkeleton';
import ProfileSkeleton from '../../components/ui/skeletons/ProfileSkeleton';
const UsersProfilePage = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  //   const [blogs, setBlogs] = useState([]);

  //   const fetchUser = await axios.get;
  user && console.log(user);
  const getUserData = async () => {
    try {
      const res = await axios.get(`${base_url}/users/profile/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate('/user-not-found');
    }
  };
  console.log(params);
  useEffect(() => {
    getUserData();
  }, [params]);
  // if (!user) return <div>Loading...</div>;
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

export default UsersProfilePage;
