/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from './context/authContext';

function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        user?.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
