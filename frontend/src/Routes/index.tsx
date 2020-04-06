import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoutes'

import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import NewIncident from '../pages/NewIncident';

const Routes = ()=>{
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <PrivateRoute path="/profile" component={Profile}/>
        <PrivateRoute path="/incidents/new" component={NewIncident}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;