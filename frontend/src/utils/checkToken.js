import { jwtDecode } from 'jwt-decode';
export const checkToken = () => {
  const token = localStorage.getItem('blog_AuthToken');
  // if token doesnt exist return false
  if (!token) {
    return false;
  }

  try {
    // decoded token with jwt-decode
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    // check the expiry time of token
    if (decodedToken.exp < currentTime) {
      // expired then remove it from localStorage
      localStorage.removeItem('blog_AuthToken');
      return false;
    }
    // token exists and is valid
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const removeToken = () => {
  localStorage.removeItem('blog_AuthToken');
};

export const setToken = (token) => {
  localStorage.setItem('blog_AuthToken', token);
};
