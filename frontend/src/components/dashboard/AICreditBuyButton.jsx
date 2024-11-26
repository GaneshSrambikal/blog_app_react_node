import { useState } from 'react';
import '../../styles/dashboardpage.css';
import { Oval } from 'react-loader-spinner';
import { BsSpeedometer } from 'react-icons/bs';
import axios from 'axios';
const AICreditBuyButton = () => {
  const base_url = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(100);
  const receiptId = '123456789';
  const currency = 'INR';
  const handlePayment = async () => {
    setLoading(true);
    const orders = await axios.post(`${base_url}/payment/razorpay/orders`, {
      amount: amount * 100,
      currency,
      receipt: receiptId,
    });
    const response = await orders.data;
    console.log(response);
    setLoading(false);
    const option = {
      key: '',
      amount: amount * 100,
      currency,
      name: 'Blog App',
      description: 'Test Transaction',
      image: '',
      order_id: response.id,
      handler: async function (res) {
        console.log('payment captured');
        console.log(res);
        const resp = await axios.post(`${base_url}/payment/razorpay/validate`, {
          ...res,
        });
        console.log('purchased.');
        setLoading(false);
      },
      prefill: {
        name: 'Blog App',
        email: 'blogapp@gmail.com',
        contact: '9000000000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#263246',
      },
    };

    // eslint-disable-next-line no-undef
    const rzp1 = new Razorpay(option);
    rzp1.on('payment failed', function (res) {
      alert(res.error.code);
    });
    rzp1.open();
  };

  return (
    <>
      <button type='button' onClick={handlePayment}>
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
            <span style={{ marginLeft: '1rem' }}>please wait .. </span>
          </>
        ) : (
          <>
            <BsSpeedometer />
            buy now
          </>
        )}
      </button>
    </>
  );
};

export default AICreditBuyButton;
