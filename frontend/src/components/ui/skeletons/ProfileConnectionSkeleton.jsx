import '../../../styles/profileskeleton.css';
const ProfileConnectionSkeleton = () => {
  return (
    <div className='profile-connections-container'>
      <h2>connections</h2>
      {/* Followers */}
      <div className='profile-connections-c-f-c'>
        <h3>Followers</h3>
        <div className='profile-connections-c-f-cs'>
          <div className='profile-connections-card-c-skeleton skeleton-shimmer'></div>
          <div className='profile-connections-card-c-skeleton skeleton-shimmer'></div>
        </div>
      </div>
      {/* Following */}
      <div className='profile-connections-c-f-c'>
        <h3>Following</h3>
        <div className='profile-connections-c-f-cs'>
          <div className='profile-connections-card-c-skeleton skeleton-shimmer'></div>
          <div className='profile-connections-card-c-skeleton skeleton-shimmer'></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileConnectionSkeleton;
