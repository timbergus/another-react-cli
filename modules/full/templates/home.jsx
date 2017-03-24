import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getContent } from '../reducers/content';
import { incrementCounter, decrementCounter } from '../reducers/counter';
import { RaisedButton } from 'material-ui';

const mapStateToProps = state => {
  return {
    counter: state.counter,
    content: state.content
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getContent: bindActionCreators(getContent, dispatch),
    incrementCounter: bindActionCreators(incrementCounter, dispatch),
    decrementCounter: bindActionCreators(decrementCounter, dispatch)
  };
};

class HomeComponent extends React.Component {

  static propTypes = {
    history: React.PropTypes.object,
    getContent: React.PropTypes.func,
    incrementCounter: React.PropTypes.func,
    decrementCounter: React.PropTypes.func,
    content: React.PropTypes.object,
    counter: React.PropTypes.number
  }

  logout () {
    Reflect.deleteProperty(localStorage, 'token');
    this.props.history.push('/login');
  }

  componentWillMount () {
    this.props.getContent();
  }

  render () {
    return (
      <div>
        <h1>Home component is working!</h1>
        { this.props.content.subtitle.length > 0 && <h2>{ this.props.content.subtitle }</h2> || <h2 className="subtitle">Loading subtitle...</h2> }
        <h3>Counter: { this.props.counter }</h3>
        <RaisedButton
          label="Increment"
          onClick={ this.props.incrementCounter }
          labelColor="rgba(255, 255, 255, 1)"
          backgroundColor="rgba(119, 190, 119, 1)"
          className="home-button"
        />
        <RaisedButton
          label="Decrement"
          onClick={ this.props.decrementCounter }
          labelColor="rgba(255, 255, 255, 1)"
          backgroundColor="rgba(255, 105, 97, 1)"
          className="home-button"
        />
        <RaisedButton
          label="Logout"
          onClick={ this.logout.bind(this) }
          labelColor="rgba(255, 255, 255, 1)"
          backgroundColor="rgba(255, 105, 97, 1)"
          className="home-button"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
