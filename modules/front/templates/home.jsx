import PropTypes from 'prop-types';
import React, { Component } from 'react';
{{# redux }}
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getContent } from '../reducers/content';
import { incrementCounter, decrementCounter } from '../reducers/counter';
{{/ redux }}
{{# material-ui }}
import { RaisedButton } from 'material-ui';
{{/ material-ui }}
{{# redux }}

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

{{/ redux }}
{{^ redux }}export default {{/ redux }}class HomeComponent extends Component {

  static propTypes = {
    history: PropTypes.object{{# redux }},{{/ redux }}
    {{# redux }}
    getContent: PropTypes.func,
    incrementCounter: PropTypes.func,
    decrementCounter: PropTypes.func,
    content: PropTypes.object,
    counter: PropTypes.number
    {{/ redux }}
  }
  {{# redux }}

  componentWillMount () {
    this.props.getContent();
  }

  {{/ redux }}
  render () {
    return ({{# redux }}
      <div>{{/ redux }}
      {{# redux }}  {{/ redux }}<h1>Home component is working!</h1>
      {{# redux }}
      {{# redux }}  {{/ redux }}<h3>{ this.props.content.subtitle }</h3>
      {{# redux }}  {{/ redux }}<h2>{ this.props.counter }</h2>
      {{# material-ui }}
      {{# redux }}  {{/ redux }}<RaisedButton
      {{# redux }}  {{/ redux }}  label="Increment"
      {{# redux }}  {{/ redux }}  onClick={ this.props.incrementCounter }
      {{# redux }}  {{/ redux }}  labelColor="rgba(255, 255, 255, 1)"
      {{# redux }}  {{/ redux }}  backgroundColor="rgba(119, 190, 119, 1)"
      {{# redux }}  {{/ redux }}/>
      {{# redux }}  {{/ redux }}<RaisedButton
      {{# redux }}  {{/ redux }}  label="Decrement"
      {{# redux }}  {{/ redux }}  onClick={ this.props.decrementCounter }
      {{# redux }}  {{/ redux }}  labelColor="rgba(255, 255, 255, 1)"
      {{# redux }}  {{/ redux }}  backgroundColor="rgba(255, 105, 97, 1)"
      {{# redux }}  {{/ redux }}/>
      {{/ material-ui }}
      {{^ material-ui }}
      {{# redux }}  {{/ redux }}<button onClick={ this.props.incrementCounter }>Increment</button>
      {{# redux }}  {{/ redux }}<button onClick={ this.props.decrementCounter }>Decrement</button>
      {{/ material-ui }}
      {{/ redux }}
      {{# redux }}</div>
    {{/ redux }});
  }
}
{{# redux }}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
{{/ redux }}
