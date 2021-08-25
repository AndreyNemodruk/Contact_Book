/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth';
import authContext from '../context/authContext';
import C from '../constants/constatnts';
import PhoneBook from '../PhoneBook/PhoneBook';
import PrivateRoute from '../PrivateRoute';
import Registr from '../Login/index';
import api from '../../api';

const App = () => {
  const history = useHistory();
  const { login, logOut, user, ready } = useAuth();
  const dispatch = useDispatch();
  dispatch({ type: C.SET_USER, payload: user });

  useEffect(() => {
    const req =
      user &&
      api.contacts
        .getAll()
        .then((res) =>
          dispatch({ type: C.SET_ALL_CONTACTS, payload: res.data.contacts })
        )
        .catch((e) => {
          if (e.response.status === 401) {
            history.push('/');
          }
        });
  });

  useEffect(() => {
    const req =
      user &&
      api.contacts
        .birthday()
        .then((res) =>
          dispatch({ type: C.SET_BIRTHDAY_DATA, payload: res.data.contacts })
        )
        .catch();
  });

  useEffect(() => {
    const req =
      user &&
      api.group
        .getAll()
        .then((res) =>
          dispatch({ type: C.SET_ALL_CAT, payload: res.data.groups })
        )
        .catch();
  });

  return (
    <authContext.Provider
      value={{
        login,
        logOut,
        user,
        ready,
      }}
    >
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
