// import React from 'react'

import { useAuth } from '../../context/AuthContext';

const UpdateProfilePage = () => {
  const { user } = useAuth();
  console.log(user);
  return <div>UpdateProfilePage</div>;
};

export default UpdateProfilePage;
