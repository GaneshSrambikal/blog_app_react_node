import { MdOutlineAccessTime } from 'react-icons/md';
import '../../../styles/blogpageskeleton.css';
const BlogPageSkeleton = () => {
  return (
    <div className='blogpage-main-c'>
      <div className='blogpage-m-tags-c'>
        <span className='bmtag-skeleton skeleton-shimmer'></span>
        <span className='bmreadt-skeleton skeleton-shimmer'>
          <MdOutlineAccessTime />
        </span>
      </div>
      <div className='bm-header'>
        <h1 className='skeleton-shimmer'></h1>
      </div>
      <div className='bm-user-card'>
        <div className='bm-user-card-av-c skeleton-shimmer'></div>
        <div className='bm-user-card-info '>
          <p className='bm-user-card-info-name skeleton-shimmer'></p>
          <span className='bm-user-card-info-title skeleton-shimmer'></span>
        </div>
      </div>
      <div className='bm-image-content-c-skeleton skeleton-shimmer'>
        <div className='bm-hero-image-skeleton skeleton-shimmer'></div>
        <div className='bm-excerpt'>
          <p></p>
        </div>
        <div className='bm-content'>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default BlogPageSkeleton;
