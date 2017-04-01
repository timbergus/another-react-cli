import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import HomeComponent from './home';
import ProfileComponent from './profile';
import AboutComponent from './about';

export default class SecureComponent extends Component {

  logout () {
    Reflect.deleteProperty(localStorage, 'token');
    this.props.history.push('/login');
  }

  render () {
    return (
      <div>
        <nav>
          <NavLink to="/secure/home" activeClassName="active">Home</NavLink>
          <NavLink to="/secure/profile" activeClassName="active">Profile</NavLink>
          <NavLink to="/secure/about" activeClassName="active">About</NavLink>
        </nav>
        <button onClick={ this.logout.bind(this) }>Login</button>
        <Route path="/secure/home" component={ HomeComponent } />
        <Route path="/secure/profile" component={ ProfileComponent } />
        <Route path="/secure/about" component={ AboutComponent } />
      </div>
    );
  }
}
