import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { RxAvatar, RxDashboard } from 'react-icons/rx';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { MdAddCircleOutline } from 'react-icons/md';
import '../styles/navbar.css';
import Logo from './Logo';
const react_base_url = import.meta.env.VITE_API_BASE_URL;
const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      logout();
      navigate('/login');
      await axios.post(`${react_base_url}/users/logout`);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // listen for outside div clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className='navbar-0'>
      <nav className='navbar'>
        <div className='navbar-brand'>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        {!user ? (
          <div className='navbar-right'>
            <Link to='/login' className='navbar-user-action-btn'>
              login
            </Link>
            <Link to='/register' className='navbar-user-action-btn'>
              sign up
            </Link>
          </div>
        ) : (
          <div className='navbar-right'>
            <Link to='/blogs/blog/create-blog' className='navbar-add-blog-btn'>
              <MdAddCircleOutline /> Add blog
            </Link>
            <div className='navbar-avatar' onClick={toggleDropdown}>
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt='navbar-avatar'
                  className='navbar-avatar-img'
                />
              ) : (
                <div className='navbar-avatar-initials'>
                  {user?.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
              )}
              <MdOutlineMenuOpen
                className='navbar-menu-icon'
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className='navbar-dropdown' ref={dropdownRef}>
                  <p>Signed in as: {user.email}</p>
                  <ul>
                    <li>
                      <NavLink
                        to='/profile'
                        className={({ isActive }) =>
                          isActive
                            ? 'navbar-navlinks-active'
                            : 'navbar-navlinks'
                        }
                      >
                        <RxAvatar /> profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/dashboard'
                        className={({ isActive }) =>
                          isActive
                            ? 'navbar-navlinks-active'
                            : 'navbar-navlinks'
                        }
                      >
                        <RxDashboard /> dashboard
                      </NavLink>
                    </li>
                    <li onClick={handleSignout}>
                      <RiLogoutBoxRLine />
                      sign out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
