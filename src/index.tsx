import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import gameReducer from 'src/core/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import sound from 'src/core/middleware/sound';
import replay from 'src/core/middleware/replay';
import {loadAssets} from 'src/core/utils';
import assets from 'src/data/assets';
import {tick} from 'src/core/action/tick';
import parameters from 'src/core/parameters';

loadAssets(assets.intro, () => {}).then(() => {
  const store = createStore(gameReducer, composeWithDevTools(applyMiddleware(thunk, sound, replay)));

  setInterval(() => {
    store.dispatch(tick());
  }, parameters.tickLength);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
    );

  }
);

registerServiceWorker();
