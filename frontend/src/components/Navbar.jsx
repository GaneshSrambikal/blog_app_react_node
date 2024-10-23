// import React from 'react'

import axios from 'axios';
// import { removeToken } from '../utils/checkToken';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
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
      <button onClick={handleSignout}>Signout</button>
    </div>
  );
};

export default Navbar;
