import React from 'react';
import { RaisedButton } from 'material-ui';

export default class LoginComponent extends React.Component {

  static propTypes = {
    history: React.PropTypes.object
  }

  login () {
    localStorage.token = '12345';
    this.props.history.push('/');
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={ this.login.bind(this) }>Login</button>
      </div>
    );
  }
}
