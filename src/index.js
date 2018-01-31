import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import thunkMiddleware from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';

import App from '@/App';
import reducers from '@/reducers';

// CSS
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '@/styles/general.scss';

// Store
const history = createHistory();
const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history)
  )
);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('main')
  );
};

render(App);

if (module.hot) { module.hot.accept('@/App', () => render(App)); }
