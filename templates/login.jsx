import React from 'react';

export default class LoginComponent extends React.Component {

  login () {
    localStorage.token = '12345';
    this.props.history.push('/');
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
          <button className="green" onClick={ this.login.bind(this) }>Login</button>
      </div>
    );
  }
}
