import { useContext, useState } from 'react';
import { GrMoney } from 'react-icons/gr';
import { FaArrowRight } from 'react-icons/fa6';
import { BsSpeedometer } from 'react-icons/bs';
import { Oval } from 'react-loader-spinner';
import '../../styles/dashboardpage.css';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
const RedeemRewardButton = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const { token, loadUser } = useContext(AuthContext);
  const [loading, setLoading] = useState();
  const addToast = useToast();
  const handleRedeem = async () => {
    setLoading(true);

    try {
      await axios.post(
        `${base_url}/users/redeem-credits`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadUser();
      setLoading(false);
      addToast('Credits Redeemed successfully', 'toast-success');
    } catch (error) {
      console.log(error);
      setLoading(false);
      addToast('Failed to redeem credits', 'toast-danger');
    }
  };
  return (
    <button
      type='button'
      onClick={handleRedeem}
      disabled={loading}
      className='dashboardpage-redeem-btn'
    >
      {loading ? (
        <>
          <Oval
            visible={loading}
            height='20'
            width='20'
            color='#f369f2'
            ariaLabel='oval-loading'
            wrapperStyle={{}}
            wrapperClass=''
          />{' '}
          <>
            <GrMoney /> <FaArrowRight /> <BsSpeedometer />{' '}
          </>
        </>
      ) : (
        <>
          <GrMoney /> redeem 100 rewards
        </>
      )}
    </button>
  );
};

export default RedeemRewardButton;
