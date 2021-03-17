import { useState, useCallback, useEffect } from "react";
import { setAuthorizationHeader } from "../../api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const login = useCallback((user) => {
    setUser(user);
    setAuthorizationHeader(user.token);
    localStorage.setItem("phone_book", JSON.stringify(user));
  }, []);

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("phone_book");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("phone_book"));
    if (user) {
      setUser(user);
      login(user);
    }
    setReady(true);
  }, []);

  return { login, logOut, user, ready };
};
