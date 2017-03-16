import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import HomeComponent from './components/home.jsx';
import Private from './private.jsx';
import LoginComponent from './components/login.jsx';

export default class Routes extends React.Component {
  render () {
    return (
      <HashRouter>
        <div>
          <Route path="/login" component={ LoginComponent } />
          <Private exact path="/" component={ HomeComponent }/>
        </div>
      </HashRouter>
    );
  }
}
