import { createContext } from 'react';

const authContext = createContext({
  token: null,
  userId: null,
  login: '',
  logOut: '',
  isAuth: false,
  user: null,
});

export default authContext;
