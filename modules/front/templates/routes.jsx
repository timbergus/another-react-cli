import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import LoginComponent from './components/login';
import SecureComponent from './components/secure';

export default class Routes extends React.Component {

  isLogged () {
    return localStorage.token && localStorage.token === '12345';
  }

  admit () {
    return <Redirect to="/secure/home" />;
  }

  expel () {
    return <Redirect to="/login" />;
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" render={ () => {
            return this.isLogged() ? this.admit() : this.expel();
          } } />
          <Route exact path="/login" render={ props => {
            return this.isLogged() ? this.admit() : <LoginComponent { ...props } />;
          } }/>
          <Route exact path="/secure" render={ () => {
            return this.isLogged() ? this.admit() : this.expel();
          } }/>
          <Route path="/secure" render={ props => {
            return this.isLogged() ? <SecureComponent { ...props } /> : this.expel();
          } }/>
        </div>
      </HashRouter>
    );
  }
}
