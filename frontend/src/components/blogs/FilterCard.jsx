import {
  MdCalendarMonth,
  MdOutlineAccessTime,
} from 'react-icons/md';
// import AvatarPlaceholder from '../../assets/images/avatarPlaceholder.png';
import { Link } from 'react-router-dom';
import { getCreatedDate } from '../../utils/formatDates';

const FilterCard = ({ blog }) => {
  return (
    <article className='filtersearch-result-card-c'>
      <Link to={`/blogs/blog/${blog?._id}`}>
        <div className='fs-res-img-c'>
          <img src={blog?.heroImage} alt='blog image' />
        </div>
        <div className='fs-res-content'>
          <div className='fs-res-content-tags-read'>
            <div className='fs-res-content-tag'>{blog?.category}</div>
            <div className='fs-res-content-read'>
              <MdOutlineAccessTime />
              {`${blog?.readingTime} min read`}
            </div>
          </div>
          <div className='fs-res-content-title-des'>
            <h3>{blog?.title}</h3>
            <p>{String(blog?.excerpt).slice(0, 60) + '....'}</p>
          </div>
          <div className='fs-res-content-user-card'>
            <div className='fs-res-content-user-card-av-c'>
              <img src={blog?.author.avatar_url} alt='user-card-av' />
            </div>
            <div className='fs-res-content-user-card-info-c'>
              <p>{blog?.author?.name}</p>
              <span>
                <MdCalendarMonth /> {getCreatedDate(blog?.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default FilterCard;
