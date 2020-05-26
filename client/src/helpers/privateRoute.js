import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  console.log("token", token)
    return (
      <Route {...rest} render={(props) => (
        token 
          ? <Component {...props} />
          : <Redirect to='/' />
      )} />
    )
};

export default PrivateRoute;
