
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import '../../../styles/profileskeleton.css';
const ProfileSkeleton = () => {
  return (
    <div className='user-profile-container'>
      <div className='profile-c-container'>
        <div className='profile-c-avatar-circle-skeleton skeleton-shimmer'></div>
        <div className='profile-c-user-details'>
          <h1 className='profile-c-user-name-skeleton skeleton-shimmer'></h1>
          <p className='profile-c-user-title skeleton-shimmer'></p>
          <div className='pc-user-details-loctn'>
            <div>
              <CiLocationOn />
              <p className='pc-user-d-loc skeleton-shimmer'></p>
            </div>
            <div>
              <CiCalendar />
              <p className='pc-user-d-joined skeleton-shimmer'> </p>
            </div>
          </div>
          <div className='pc-user-details-connections'>
            <div>
              <p></p>
              <p>followers</p>
            </div>
            <div>
              <p></p>
              <p>following</p>
            </div>
            <div>
              <p></p>
              <p>posts</p>
            </div>
          </div>
          <div className='pc-user-details-edit-btn-c-skeleton skeleton-shimmer'></div>
        </div>
      </div>
      {/* tabs */}
      <div className='profile-tabs-skeleton '>
      <div className='p-tabs-container skeleton-shimmer'>
       
      </div>
      <div className='profile-details-c'>
      {/* <h2>ProfileDetails</h2> */}
      <div className='profile-details-about-c-skeleton skeleton-shimmer'>
      </div>
      <div className='profile-details-about-c-skeleton skeleton-shimmer'>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProfileSkeleton;
