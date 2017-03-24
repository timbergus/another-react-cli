# {{ name }} Project

This is a [React](https://facebook.github.io/react/) template for a quick start with React and [Redux](https://github.com/reactjs/redux).

## Template Structure

The file structure is as follow:

### src/index.html

Is the index file where we are going to load the application bundle inside a `div` with __app__ identifier.

### src/app/main.jsx

The main file for our application. It imports __React__, __ReactDOM__ and __Provider__. It also imports our store and routes and it injects the store with the Provider and the routes in the `ReactDOM.render()` function in our anchor element in the DOM: `<div id="app"></div>`.

### src/app/store.js

This is the main file for the store that imports the reducers from __src/app/reducers__, and the middleware for asynchronous calls ([redux-thunk](https://github.com/gaearon/redux-thunk)). It also when creating the store adds a line for the [redux plugin for Chrome](https://github.com/zalmoxisus/redux-devtools-extension). This makes really easy to debug the store and travel forward and backward in time.

### src/app/routes.jsx

This file store three things: the routes, the imports for the components that respond to the routers and the events for the routers. We are going to use this events, `onEnter` to be precise, to authenticate the user and allow or not the navigation.

We also bind here the components from __src/app/components__ with the store elements and actions, so we define the route elements as intelligent elements and the elements that depends on this route heads as dumb components that receive their props from their parent.

## Styles

To add styles we are going to use Sass. I like Sass. So we are going to add the loader to WebPack and load the __style.scss__ into our __main.jsx__ file. The we will `@import` the rest of the files into __style.scss__, fonts, colors, variables... and this will allow us to maintain separated structure and styles having an only entry point:

```javascript
import './style.scss';
```
