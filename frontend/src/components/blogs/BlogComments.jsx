import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import CommentCard from './CommentCard';
import { getInitials } from '../../utils/formatNames';
import { useToast } from '../../context/ToastContext';
import { Oval } from 'react-loader-spinner';
import { FaRegComment } from 'react-icons/fa';
import LikeComponent from './LikeComponent';
const BlogComments = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { loading, user, token } = useContext(AuthContext);
  const params = useParams();
  const addToast = useToast();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const handleInput = (e) => {
    setComment(e.target.value);
  };
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${base_url}/blogs/${params.id}/comment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.comments)
      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = async (e) => {
    e.preventDefault();
    if (comment) {
      try {
        setIsloading(true);
        await axios.post(
          `${base_url}/blogs/${params.id}/comment`,
          {
            comment,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setComment('');
        fetchComments();
        setIsloading(false);
        addToast('Comment added successfully', 'toaster-success');
        // update user rewards for comments. Rewards: 5
        await axios.post(
          `${base_url}/users/update-rewards`,
          { rewardType: 'comment' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        setIsloading(false);
        console.log(error);
      }
    }
  };
  const handleDeleteComment = async (id) => {
    try {
      setIsloading(true);
      await axios.delete(`${base_url}/blogs/${params.id}/comment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  if (loading) return <div>Loading ...</div>;
  return (
    <>
      <div className='bm-like-comment-c'>
        <LikeComponent />
        <div className='bm-comment-c'>
          <FaRegComment />
          {`${comments?.length} Comments`}
        </div>
      </div>
      {/* Comment form */}
      <div className='commentform-container'>
        <div className='commentform-c-user-a'>
          {user?.avatar_url?.length > 0 ? (
            <img src={user?.avatar_url} alt='' />
          ) : (
            getInitials(user?.name)
          )}
        </div>
        <form className='comment-form-c-form' onSubmit={handleComment}>
          <textarea
            className='comment-form-c-f'
            placeholder='Add comment...'
            onChange={handleInput}
            value={comment}
          ></textarea>
          <button
            type='buttondsaffd'
            className='submit-button comment-btn'
            disabled={isLoading}
          >
            {isLoading ? (
              <Oval
                visible={isLoading}
                height='15'
                width='15'
                color='#fff'
                ariaLabel='oval-loading'
                wrapperStyle={{}}
                wrapperClass=''
              />
            ) : (
              `add comment`
            )}
          </button>
        </form>
      </div>
      {/* comments */}
      <div className='bm-comments-c'>
        {comments && comments?.length > 0 ? (
          comments.map((comment) => (
            <CommentCard
              comment={comment}
              key={comment._id}
              isLoading={isLoading}
              handleDeleteComment={handleDeleteComment}
            />
          ))
        ) : (
          <div className='bm-comments-c-null'>
            <p>No Comments</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogComments;
