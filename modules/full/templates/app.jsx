import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import HomeComponent from './home';
import ProfileComponent from './profile';
import AboutComponent from './about';

export default class AppComponent extends Component {
  render () {
    return (
      <div>
        <nav>
          <NavLink to="/app/home" activeClassName="active">Home</NavLink>
          <NavLink to="/app/profile" activeClassName="active">Profile</NavLink>
          <NavLink to="/app/about" activeClassName="active">About</NavLink>
        </nav>
        <Route path="/app/home" component={ HomeComponent } />
        <Route path="/app/profile" component={ ProfileComponent } />
        <Route path="/app/about" component={ AboutComponent } />
      </div>
    );
  }
}
