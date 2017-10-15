import React{{^routes}}, { Component }{{/routes}} from 'react';
import { render } from 'react-dom';
{{#websockets}}
{{^routes}}
import PropTypes from 'prop-types';
{{/routes}}
{{/websockets}}
{{#redux}}
import { Provider } from 'react-redux';
{{/redux}}
{{#material-ui}}
import { MuiThemeProvider } from 'material-ui';
{{/material-ui}}
{{#websockets}}
import io from 'socket.io-client';
{{/websockets}}
{{#redux}}

import store from './store';
{{/redux}}
{{#websockets}}

const socket = io.connect('http://localhost:1337');

socket.on('connect', () => console.log('Socket connected!'));
{{/websockets}}
{{#routes}}

import Routes from './routes';
{{/routes}}
{{^routes}}

class App extends Component {
{{#websockets}}

  static propTypes = {
    socket: PropTypes.object
  }

  componentWillMount () {
    this.props.socket.on('alive', () => console.log('Connection is alive!'));
  }

  componentDidMount () {
    this.props.socket.emit('isAlive');
  }

{{/websockets}}
  render () {
    return (
      <h1>Hello, World!</h1>
    );
  }
}
{{/routes}}

render(
  {{#redux}}
  <Provider store={ store }>
  {{/redux}}
  {{#material-ui}}
  {{#redux}}  {{/ redux }}<MuiThemeProvider>
  {{/material-ui}}
  {{#redux}}  {{/redux}}{{#material-ui}}  {{/material-ui}}<{{#routes}}Routes{{/routes}}{{^routes}}App{{/routes}}{{#websockets}} socket={ socket }{{/websockets}} />
  {{#material-ui}}
  {{#redux}}  {{/redux}}</MuiThemeProvider>
  {{/material-ui}}
  {{#redux}}
  </Provider>
  {{/redux}}
  , document.getElementById('root')
);
