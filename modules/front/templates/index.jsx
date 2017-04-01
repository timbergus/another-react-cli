import React{{^routes}}, { Component }{{/routes}} from 'react';
import { render } from 'react-dom';
{{# redux }}
import { Provider } from 'react-redux';
{{/ redux }}
{{# material-ui }}
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
{{/ material-ui }}
{{# websockets }}
import io from 'socket.io-client';
{{/ websockets }}
{{# material-ui }}

injectTapEventPlugin();
{{/ material-ui }}
{{# redux }}

import store from './store';
{{/ redux }}
{{# websockets }}

const socket = io.connect('http://localhost:1337');

socket.on('connect', () => console.log('Socket connected!'));
{{/ websockets }}
{{#routes}}

import Routes from './routes';
{{/routes}}
{{^routes}}

export default class App extends Component {
{{# websockets }}

  static propTypes = {
    socket: React.PropTypes.object
  }

  componentWillMount () {
    this.props.socket.on('alive', () => console.log('Connection is alive!'));
  }

  componentDidMount () {
    this.props.socket.emit('isAlive');
  }

{{/ websockets }}
  render () {
    return (
      <h1>Hello, World!</h1>
    );
  }
}
{{/routes}}

render(
  {{# redux }}
  <Provider store={ store }>
  {{/ redux }}
  {{# material-ui }}
  {{# redux }}  {{/ redux }}<MuiThemeProvider>
  {{/ material-ui }}
  {{# redux }}  {{/ redux }}{{# material-ui }}  {{/ material-ui }}<{{#routes}}Routes{{/routes}}{{^routes}}App{{/routes}}{{# websockets }} socket={ socket }{{/ websockets }} />
  {{# material-ui }}
  {{# redux }}  {{/ redux }}</MuiThemeProvider>
  {{/ material-ui }}
  {{# redux }}
  </Provider>
  {{/ redux }}
  , document.getElementById('root')
);
