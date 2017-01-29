import React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'; // eslint-disable-line no-unused-vars

import HomeComponent from './components/home.jsx';
import LoginComponent from './components/login.jsx';

export default class Routes extends React.Component {

  someAuthCheck (nextState, replace, done) {
    if (!(localStorage.token && localStorage.token === '12345')) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
      done();
    }
    done();
  }

  render () {
    return (
      <Router history={ hashHistory }>
        <Route path="/" component={ HomeComponent } onEnter={ this.someAuthCheck } />
        <Route path="/login" component={ LoginComponent } />
      </Router>
    );
  }
}
