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
import sound from 'src/core/middleware/sound';
import {loadAssets} from 'src/core/utils';



loadAssets([
  'asset/shaman.mp4',
  'asset/death.mp4',
  'asset/small/viking_1.mp4',
  'asset/small/viking_2.mp4',
  'asset/small/viking_3.mp4',
  'asset/small/viking_4.mp4',
  'asset/small/viking_5.mp4',
  'asset/small/viking_6.mp4',
  'asset/small/viking_7.mp4',
  'asset/small/viking_8.mp4',
  'asset/small/viking_9.mp4',
  'asset/small/viking_10.mp4',
  'asset/small/viking_11.mp4',
  'asset/small/viking_12.mp4',
  'asset/small/viking_13.mp4',
  'asset/small/viking_14.mp4',
  'asset/small/viking_15.mp4',
  'asset/small/viking_16.mp4',
  'asset/small/viking_17.mp4',
  'asset/small/viking_18.mp4',
  'asset/small/viking_19.mp4',
  'asset/small/viking_20.mp4',
  'asset/small/viking_21.mp4',
  'asset/small/viking_22.mp4',
  'asset/small/viking_23.mp4',
  'asset/small/viking_24.mp4',
  'asset/small/viking_25.mp4',
  'asset/small/viking_26.mp4',
  'asset/small/viking_27.mp4',
  'asset/small/viking_28.mp4',
  'asset/sacrifice.mp3',
  'asset/no_sacrifice.mp3',
  'asset/ambient_loop.mp3'
], console.log).then(() => {
  const store = createStore(gameReducer, composeWithDevTools(applyMiddleware(thunk, sound)));
  store.dispatch(startGame());
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
    );

    registerServiceWorker();
  })
