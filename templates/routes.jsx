import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import LoginComponent from './components/login';
import AppComponent from './components/app';

export default class Routes extends React.Component {

  isLogged () {
    return localStorage.token && localStorage.token === '12345';
  }

  expel () {
    return <Redirect to="/login" />;
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" render={ () => {
            return this.isLogged() ? <Redirect to="/app" /> : this.expel();
          } } />
          <Route path="/login" component={ LoginComponent } />
          <Route path="/app" render={ () => {
            return this.isLogged() ? <AppComponent /> : this.expel();
          } }/>
          <Route exact path="/app" render={ () => {
            return this.isLogged() ? <Redirect to="/app/home" /> : this.expel();
          } } />
        </div>
      </HashRouter>
    );
  }
}
