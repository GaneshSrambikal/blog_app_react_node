import '../../styles/dashboardpage.css';
import { BsPostcardHeart, BsSpeedometer } from 'react-icons/bs';
import { FaArrowsDownToPeople, FaPeopleLine } from 'react-icons/fa6';
import { GrMoney } from 'react-icons/gr';
import { FaMedal } from 'react-icons/fa';
const DashboardPage = () => {
  return (
    <div className='dashboardpage-container'>
      <section className='dashboardpage-greeting'>
        <h1>Dashboard</h1>
        <p>{`John's overall insights`}</p>
      </section>
      <section className='dashboardpage-cards-container'>
        <article
          className='dashboardpage-card-c'
          style={{
            background:
              'linear-gradient(225deg, rgba(228, 149, 170, 1.0), rgba(220, 84, 63, 1.0))',
          }}
        >
          <div className='dashboardpage-card-info'>
            <h4>08</h4>
            <p>blogs</p>
          </div>
          <div className='dashboardpage-card-img'>
            <BsPostcardHeart style={{ color: 'rgb(253, 224, 255)' }} />
          </div>
        </article>
        <article
          className='dashboardpage-card-c'
          style={{
            background:
              'linear-gradient(225deg, rgb(165 149 228), rgb(63 220 142))',
          }}
        >
          <div className='dashboardpage-card-info'>
            <h4>10</h4>
            <p>followers</p>
          </div>
          <div className='dashboardpage-card-img'>
            <FaArrowsDownToPeople style={{ color: 'rgb(253, 224, 255)' }} />
          </div>
        </article>
        <article
          className='dashboardpage-card-c'
          style={{
            background:
              'linear-gradient(225deg, rgb(228 149 227), rgb(220 63 140))',
          }}
        >
          <div className='dashboardpage-card-info'>
            <h4>2</h4>
            <p>following</p>
          </div>
          <div className='dashboardpage-card-img'>
            <FaPeopleLine style={{ color: 'rgb(253, 224, 255)' }} />
          </div>
        </article>
        <article
          className='dashboardpage-card-c'
          style={{
            background:
              'linear-gradient(225deg, rgb(228 149 227), rgb(165 63 220))',
          }}
        >
          <div className='dashboardpage-card-info'>
            <h4>80 / 100</h4>
            <p>ai credits</p>
          </div>
          <div className='dashboardpage-card-img'>
            <BsSpeedometer style={{ color: 'rgb(253, 224, 255)' }} />
          </div>
        </article>
        <article
          className='dashboardpage-card-c'
          style={{
            background:
              'linear-gradient(225deg, rgb(150 228 149), rgb(184 220 63))',
          }}
        >
          <div className='dashboardpage-card-info'>
            <h4>8</h4>
            <p>points</p>
          </div>
          <div className='dashboardpage-card-img'>
            <GrMoney style={{ color: 'rgb(253, 224, 255)' }} />
          </div>
        </article>
        <article
          className='dashboardpage-card-c'
          style={{
            background:
              'linear-gradient(225deg, rgb(228 149 149), rgb(68 63 220))',
          }}
        >
          <div className='dashboardpage-card-info'>
            <h4>4th</h4>
            <p>leaderboard</p>
          </div>
          <div className='dashboardpage-card-img'>
            <FaMedal style={{ color: 'rgb(253, 224, 255)' }} />
          </div>
        </article>
      </section>
      <section className='dashboardpage-ai-creditsbuy-container'>
        <>
          <p>
            {` Running out of ai credits, Buy more ai credits to create new blogs
            with google's gemini!`}
          </p>
          <button>buy now</button>
        </>
      </section>
    </div>
  );
};

export default DashboardPage;
