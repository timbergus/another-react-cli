import React from 'react';
import { hashHistory } from 'react-router';

export default class LoginComponent extends React.Component {

  login () {
    localStorage.token = '12345';
    hashHistory.push('/');
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
          <button className="green" onClick={ this.login }>Login</button>
      </div>
    );
  }
}
