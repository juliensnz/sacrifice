import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import gameReducer from 'src/core/reducer';
import {startGame} from 'src/core/action';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import time from 'src/core/time';

const store = createStore(gameReducer, composeWithDevTools(applyMiddleware(thunk, time)));

store.dispatch(startGame());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
