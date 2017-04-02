import React from 'react';
{{# material-ui }}
import { RaisedButton } from 'material-ui';
{{/ material-ui }}

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
        {{# material-ui }}
        <RaisedButton
          label="Login"
          onClick={ this.login.bind(this) }
          labelColor="rgba(255, 255, 255, 1)"
          backgroundColor="rgba(119, 158, 203, 1)"
        />
        {{/ material-ui }}
        {{^ material-ui }}
        <button onClick={ this.login.bind(this) }>Login</button>
        {{/ material-ui }}
      </div>
    );
  }
}
