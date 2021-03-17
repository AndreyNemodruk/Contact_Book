import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "./context/authContext";

function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
