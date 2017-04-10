import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
{{# material-ui }}
import { RaisedButton } from 'material-ui';
{{/ material-ui }}

import HomeComponent from './home';
import ProfileComponent from './profile';
import AboutComponent from './about';

export default class SecureComponent extends Component {

  static propTypes = {
    history: PropTypes.object
  }

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
        {{# material-ui }}
        <RaisedButton
          label="Logout"
          onClick={ this.logout.bind(this) }
          labelColor="rgba(255, 255, 255, 1)"
          backgroundColor="rgba(255, 105, 97, 1)"
          className="home-button"
        />
        {{/ material-ui }}
        {{^ material-ui }}
        <button onClick={ this.logout.bind(this) }>Logout</button>
        {{/ material-ui }}
        <Route path="/secure/home" component={ HomeComponent } />
        <Route path="/secure/profile" component={ ProfileComponent } />
        <Route path="/secure/about" component={ AboutComponent } />
      </div>
    );
  }
}
