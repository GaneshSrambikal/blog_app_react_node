import '../styles/landingpage.css';
import Navbar from '../components/Navbar';
import IllnOne from '../assets/images/landingpageheroone.svg';
import IllnTwo from '../assets/images/landingpageherotwo.svg';
import { MdArrowForward } from 'react-icons/md';
import { BsPostcardHeart, BsSpeedometer } from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';
import { FaHouseUser } from 'react-icons/fa';
import { SiGooglegemini, SiRazorpay } from 'react-icons/si';
import { GrMoney } from 'react-icons/gr';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <>
      <div className='landingpage-navbar'>
        <Navbar />
      </div>
      <div className='landingpage-container'>
        <section className='landingpage-herosection-container'>
          <div className='ldp-herosection-image-desp-c'>
            <div className='ldp-herosection-image-c'>
              <div className='ldp-herosection-image'>
                <img src={IllnOne} alt='hero1' />
              </div>
              <div className='ldp-herosection-image'>
                <img src={IllnTwo} alt='hero1' />
              </div>
            </div>
            <div className='ldp-herosection-desp-c'>
              <div className='ldp-herosection-desp-info'>
                <h1>Create AI-powered blogs effortlessly</h1>
                <p>{`Post blogs and earn rewards. Powered by Google's gemini`}</p>
              </div>
              <div className='ldp-herosection-desp-action-btn-c'>
                <Link to='/login'>
                  Get Started <MdArrowForward />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className='landingpage-features-container'>
          <div className='ldp-features-c'>
            <div className='ldp-features-header'>
              <h3>features</h3>
            </div>
            <div className='ldp-features-cards-container'>
              <div className='ldp-features-card-c'>
                <div className='ldp-features-card-img-c'>
                  <BsPostcardHeart style={{ color: '#eb7373' }} />
                </div>
                <div className='ldp-features-card-desp-c'>
                  <p>
                    create and explore awesome blog post of different
                    categories.{' '}
                  </p>
                </div>
              </div>

              <div className='ldp-features-card-c'>
                <div className='ldp-features-card-img-c'>
                  <FaPeopleGroup style={{ color: '#9773eb' }} />
                </div>
                <div className='ldp-features-card-desp-c'>
                  <p>Follower other blogs and be updated on new blog posts. </p>
                </div>
              </div>

              <div className='ldp-features-card-c'>
                <div className='ldp-features-card-img-c'>
                  <FaHouseUser style={{ color: '#73ebaf' }} />
                </div>
                <div className='ldp-features-card-desp-c'>
                  <p>
                    Complete user management. Include password reset and forgot
                    password, abouts and more.{' '}
                  </p>
                </div>
              </div>

              <div className='ldp-features-card-c'>
                <div className='ldp-features-card-img-c'>
                  <SiGooglegemini style={{ color: '#738feb' }} />
                </div>
                <div className='ldp-features-card-desp-c'>
                  <p>{`Generate Blogs using google's gemini`}</p>
                </div>
              </div>
              <div className='ldp-features-card-c'>
                <div className='ldp-features-card-img-c'>
                  <GrMoney style={{ color: '#d9eb73' }} />
                </div>
                <div className='ldp-features-card-desp-c'>
                  <p>
                    Earn rewards by posting blog, liking a post or commenting.
                  </p>
                </div>
              </div>
              <div className='ldp-features-card-c'>
                <div className='ldp-features-card-img-c'>
                  <BsSpeedometer style={{ color: '#77eb73' }} />
                </div>
                <div className='ldp-features-card-desp-c'>
                  <p>Redeem your earned rewards to Ai credits</p>
                </div>
              </div>
              <div className='ldp-features-card-c'>
                <div className='ldp-features-card-img-c'>
                  <SiRazorpay style={{ color: '#294be2' }} />
                </div>
                <div className='ldp-features-card-desp-c'>
                  <p>
                    Razorpay payment integration for seemless and hasslefree
                    payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='landingpage-about-container'>
          <div className='ldp-about-c'></div>
        </section>
        <footer>footer</footer>
      </div>
    </>
  );
};

export default LandingPage;
