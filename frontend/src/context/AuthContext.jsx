import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { checkToken, removeToken, setToken } from '../utils/checkToken';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('blog_AuthToken') || null,
  isAuthenticated: false,
  loading: true,
};

const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOAD_USER: 'LOAD_USER',
};
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.payload.decoded,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: true,
      };
    case actionTypes.LOAD_USER:
      return {
        ...state,
        user: action.payload.userData,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('blog_AuthToken');
      if (checkToken(token)) {
        try {
          const res = await axios.get('/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('in load user:res', res.data);
          const userData = res.data;
          dispatch({
            type: actionTypes.LOAD_USER,
            payload: { userData, token },
          });
          console.log('in try of load user', initialState);
        } catch (error) {
          console.log(error);
          dispatch({ type: actionTypes.LOGOUT });
        }
      } else {
        dispatch({ type: actionTypes.LOGOUT });
      }
      // Set loading to false after checking the user
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    };
    loadUser();
    console.log('after loading user:', initialState);
  }, []);
  const loginUser = async (credentials) => {
    try {
      const res = await axios.post('/api/users/login', credentials);
      const { token } = res.data;
      setToken(token);
      const decoded = jwtDecode(token);
      console.log(decoded);
      dispatch({
        type: actionTypes.LOGIN,
        payload: { decoded, token },
      });
      // console.log(initialState);
    } catch (error) {
      console.error(error.response?.data?.message);
      throw error;
    }
  };

  const logout = () => {
    try {
      removeToken();
      dispatch({
        type: actionTypes.LOGOUT,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider value={{ ...state, dispatch, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
