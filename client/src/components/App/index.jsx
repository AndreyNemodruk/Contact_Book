import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { Route, useHistory } from "react-router-dom";
import authContext from "../context/authContext.js";
//import {useRoutes} from '../routes.jsx'
import { useDispatch } from "react-redux";
import C from "../constants/constatnts.js";
import PhoneBook from "../PhoneBook/PhoneBook.jsx";
import PrivateRoute from "../PrivateRoute.jsx";
import Registr from "../Login/index.jsx";
import api from "../../api.js";

const App = () => {
  const history = useHistory();
  const { login, logOut, user, ready } = useAuth();
  const dispatch = useDispatch();
  dispatch({ type: C.SET_USER, payload: user });

  useEffect(() => {
    user &&
      api.contacts
        .getAll()
        .then((res) =>
          dispatch({ type: C.SET_ALL_CONTACTS, payload: res.data.contacts })
        )
        .catch((e) => {
          if (e.response.status === 401) {
            history.push("/");
            return;
          }
        });
  });

  useEffect(() => {
    user &&
      api.contacts
        .birthday()
        .then((res) =>
          dispatch({ type: C.SET_BIRTHDAY_DATA, payload: res.data.contacts })
        )
        .catch();
  });

  useEffect(() => {
    user &&
      api.group
        .getAll()
        .then((res) =>
          dispatch({ type: C.SET_ALL_CAT, payload: res.data.groups })
        )
        .catch((e) => console.log(e));
  });

  return (
    <authContext.Provider value={{ login, logOut, user, ready }}>
      <Route path="/" exact>
        <Registr />
      </Route>
      {ready && (
        <PrivateRoute path="/contacts">
          <PhoneBook />
        </PrivateRoute>
      )}
    </authContext.Provider>
  );
};

export default App;
