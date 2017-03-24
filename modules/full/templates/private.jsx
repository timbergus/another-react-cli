import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class Private extends Component {

  static propTypes = {
    component: React.PropTypes.object
  }

  render () {
    let { component, ...rest } = this.props;
    return (
      <Route { ...rest }
        render={
          props => {
            if (localStorage.token && localStorage.token === '12345') {
              return React.createElement(component, props);
            }
            return (
              <Redirect
                to={{ pathname: '/login', state: { from: props.location }}}
              />
            );
          }
        }
      />
    );
  }
}
