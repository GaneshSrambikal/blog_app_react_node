import ProfileComponent from '../../components/profile/ProfileComponent';
import { useContext } from 'react';
import '../../styles/profile.css';
import AuthContext from '../../context/AuthContext';
const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  //   const [blogs, setBlogs] = useState([]);

  //   const fetchUser = await axios.get;
  user && console.log(user);
  if (!user) return <div>Loading...</div>;
  return (
    <div className='user-profile-container'>
      <ProfileComponent user={user} />
      <div>Tabs for profile ,posts, connections</div>
      <div>
        about Me <p>{user.about}</p>
      </div>
      <div>Recent Post</div>
    </div>
  );
};

export default ProfilePage;
