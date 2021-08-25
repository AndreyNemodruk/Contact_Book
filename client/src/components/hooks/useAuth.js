import { useState, useCallback, useEffect } from 'react';
import { setAuthorizationHeader } from '../../api';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const login = useCallback((us) => {
    setUser(us);
    setAuthorizationHeader(us.token);
    // eslint-disable-next-line no-undef
    localStorage.setItem('phone_book', JSON.stringify(us));
  }, []);

  const logOut = () => {
    setUser(null);
    // eslint-disable-next-line no-undef
    localStorage.removeItem('phone_book');
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const userStor = JSON.parse(localStorage.getItem('phone_book'));
    if (userStor) {
      setUser(userStor);
      login(userStor);
    }
    setReady(true);
  }, [login]);

  return {
    login,
    logOut,
    user,
    ready,
  };
};

export default useAuth;
