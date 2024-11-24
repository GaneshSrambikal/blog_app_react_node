import { MdCalendarMonth, MdOutlineAccessTime } from 'react-icons/md';
import AvatarPlaceholder from '../../assets/images/avatarPlaceholder.png';
import { Link } from 'react-router-dom';
import { getCreatedDate } from '../../utils/formatDates';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
const base_url = import.meta.env.VITE_API_BASE_URL;
const FilterCard = ({ blog }) => {
  const [userAvatar, setUserAvatar] = useState(AvatarPlaceholder);
  const { token } = useContext(AuthContext);

  const fetchUseAvatar = useCallback(async () => {
    const res = await axios.get(
      `${base_url}/users/user/${blog?.author?.id}/get-avatar-url`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUserAvatar(res.data.avatar_url);
  }, [base_url, token, blog]);

  useEffect(() => {
    fetchUseAvatar();
  }, []);
  if (!blog) return <div>loading...</div>;
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
              <img src={userAvatar} alt='user-card-av' />
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
