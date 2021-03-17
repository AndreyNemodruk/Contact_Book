import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Registr from "./Login/index.jsx";
import PhoneBook from "./PhoneBook/PhoneBook.jsx";
const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/contacts">
          <PhoneBook />
        </Route>
        <Redirect to="/contacts" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Registr />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
