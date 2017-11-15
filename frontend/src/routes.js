import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from 'features/App';
import Common from 'components/Common';

export default (
  <Switch>
    <Route path='/login' component={App.Auth.Login} />
    <Route path='/logout' component={App.Auth.Logout} />

    <Route path='/profile' component={App.Auth.isRequired(App.User.Profile)} />

    <Route exact path='/user' component={App.Auth.isRequired(App.User.List)} />
    <Route exact path='/user/create' component={App.Auth.isRequired(App.User.Create)} />
    <Route exact path='/user/edit/:userId' component={App.Auth.isRequired(App.User.Edit)} />
    <Route exact path='/user/detail/:userId' component={App.Auth.isRequired(App.User.Detail)} />

    <Route exact path='/group' component={App.Auth.isRequired(App.Group.List)} />
    <Route exact path='/group/create' component={App.Auth.isRequired(App.Group.Create)} />
    <Route exact path='/group/edit/:userId' component={App.Auth.isRequired(App.Group.Edit)} />
    <Route exact path='/group/detail/:userId' component={App.Auth.isRequired(App.Group.Detail)} />

    <Route exact path='/' component={App.Auth.isRequired(App.Home)} />
    <Route component={Common.NotFound} />
  </Switch>
);
