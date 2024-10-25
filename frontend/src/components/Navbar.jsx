// import React from 'react'

import axios from 'axios';
import { useContext } from 'react';
// import { removeToken } from '../utils/checkToken';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/logout');
      logout();
      navigate('/login');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      Navbar
      <Link to='/profile'>Profile</Link>
      <button onClick={handleSignout}>Signout</button>
    </div>
  );
};

export default Navbar;
