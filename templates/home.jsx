import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementCounter, decrementCounter } from '../reducers/counter';
import { getContent } from '../reducers/content';

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

  logout () {
    Reflect.deleteProperty(localStorage, 'token');
    hashHistory.push('/login');
  }

  componentWillMount () {
    this.props.getContent();
  }

  render () {
    return (
      <div>
        <h1>React Template</h1>
        { this.props.content.subtitle.length > 0 && <h2>{ this.props.content.subtitle }</h2> || <h2 className="subtitle">Loading subtitle...</h2> }
        <h3>Counter: { this.props.counter }</h3>
        <button className="green" onClick={ this.props.incrementCounter }>Increment</button>
        <button className="red" onClick={ this.props.decrementCounter }>Decrement</button>
        <button className="red" onClick={ this.logout }>Logout</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
