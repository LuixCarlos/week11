import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

interface RoutePrivateProps extends RouteProps {
  component: React.ComponentType<any>,
}

const PrivateRoute: React.FC<RoutePrivateProps> = ({component:Component, ...rest}) => (
  <Route {...rest} render={props =>(
    localStorage.getItem('ongId') != null ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{ pathname: '/', state:{from:props.location}}}/>
    )
  )}/>
);

export default PrivateRoute;