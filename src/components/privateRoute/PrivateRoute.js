import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: redirectTo, state: { from: props.location } }}
        />
      )
    }
  />
);

const mstp = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mstp)(PrivateRoute);
