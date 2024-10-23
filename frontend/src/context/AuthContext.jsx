import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('blog_AuthToken');

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('blog_AuthToken');
        setUser(null);
        console.log(error);
      }
    }
  }, []);
  //   login
  const login = (resToken) => {
    // console.log(token);
    localStorage.setItem('blog_AuthToken', JSON.stringify(resToken));
    const decoded = jwtDecode(resToken);

    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('blog_AuthToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
