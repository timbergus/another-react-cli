import thunk from 'redux-thunk';
import { combineReducers, compose, applyMiddleware, createStore } from 'redux';

import counter from './reducers/counter';
import content from './reducers/content';

const reducer = combineReducers({ counter, content });
const middleware = [thunk];

const store = createStore(reducer, compose(
  applyMiddleware(...middleware),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

export default store;
