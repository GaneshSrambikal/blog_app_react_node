import { useContext, useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LikeComponent = () => {
  const { user, token } = useContext(AuthContext);
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const [liked, setLiked] = useState(false);
  const [blog, setBlog] = useState({});
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${base_url}/blogs/blog/${params.id}`);
      setBlog(res.data.blog);
      fetchLiked();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLiked = () => {
    if (blog) {
      blog?.likes?.includes(user._id) && setLiked(true);
      return true;
    }
  };
  const handleLike = async () => {
    setLiked(!liked);
    try {
      await axios.post(`${base_url}/blogs/${params.id}/like`, '', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBlog();
      // update user rewards for like. Rewards: 1
      if (liked === false) {
        await axios.post(
          `${base_url}/users/update-rewards`,
          { rewardType: 'like' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className='bm-like-c'>
      {blog?.likes?.includes(user._id) ? (
        <FaHeart className={'liked'} onClick={handleLike} />
      ) : (
        <FaRegHeart onClick={handleLike} />
      )}
      {`${blog?.likes?.length} Likes`}
    </div>
  );
};

export default LikeComponent;
