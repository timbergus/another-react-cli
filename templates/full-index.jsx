import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

import store from './store';
import Routes from './routes';

import './style';

render(
  <Provider store={ store }>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </Provider>, document.getElementById('root')
);
