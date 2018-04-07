import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];
const debugware = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
} else {
    const createLogger = require('redux-logger').createLogger;

    debugware.push(createLogger({
        collapsed: true,
    }));
}

const composedEnhancers = compose(applyMiddleware(...middleware, ...debugware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
