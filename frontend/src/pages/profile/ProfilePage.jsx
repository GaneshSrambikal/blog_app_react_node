import ProfileComponent from '../../components/profile/ProfileComponent';
import { useContext, useEffect } from 'react';
import '../../styles/profile.css';
import AuthContext from '../../context/AuthContext';
import ProfileTabs from '../../components/profile/ProfileTabs';
const ProfilePage = () => {
  const { user, loadUser } = useContext(AuthContext);
  //   const [blogs, setBlogs] = useState([]);

  //   const fetchUser = await axios.get;
  user && console.log(user);
  useEffect(() => {
    loadUser();
  }, []);
  if (!user) return <div>Loading...</div>;
  return (
    <div className='user-profile-container'>
      <ProfileComponent user={user} />
      <ProfileTabs />
    </div>
  );
};

export default ProfilePage;
