import { useState } from 'react';
import ProfileDetails from './ProfileDetails';
import ProfileBlogs from './ProfileBlogs';
import ProfileConnections from './ProfileConnections';
import '../../styles/profiletabs.css';
const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileDetails />;
      case 'blogs':
        return <ProfileBlogs />;
      case 'connection':
        return <ProfileConnections />;

      default:
        return null;
    }
  };
  return (
    <div className='profile-tabs'>
      <div className='p-tabs-container'>
        <button
          onClick={() => setActiveTab('profile')}
          className={`${activeTab === 'profile' && 'active'} p-tabs-btn`}
        >
          profile
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`${activeTab === 'blogs' && 'active'} p-tabs-btn`}
        >
          blogs
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`${activeTab === 'connections' && 'active'} p-tabs-btn`}
        >
          connections
        </button>
      </div>
      <div>{renderTab()}</div>
    </div>
  );
};

export default ProfileTabs;
