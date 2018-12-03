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
import {loadAssets} from 'src/core/utils';
import {startIntro, loadingFinished, loadingUpdated} from 'src/core/action/intro';
import assets from 'src/data/assets';

loadAssets(assets.intro, console.log).then(() => {
  const store = createStore(gameReducer, composeWithDevTools(applyMiddleware(thunk, sound)));
  store.dispatch(startIntro());

  loadAssets(assets.game, (progress: number) => store.dispatch(loadingUpdated(progress))).then(() => {
    store.dispatch(loadingFinished());
  });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
    );

    registerServiceWorker();
  })
