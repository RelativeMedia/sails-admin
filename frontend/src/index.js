/* eslint-disable import/default */
/* eslint-disable no-unused-vars */
import './styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import routes from './routes';

import * as es6shim from 'es6-shim';

require('./favicon.ico'); // Tell webpack to load favicon.ico
const store = configureStore();

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {routes}
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);
//
// if (module.hot) {
//   module.hot.accept('components/Root', () => {
//     const NewRoot = require('components/Root').default;
//     render(
//       <AppContainer>
//         <NewRoot store={store} history={history} />
//       </AppContainer>,
//       document.getElementById('app')
//     );
//   });
// }
