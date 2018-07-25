import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/AppRouter/AppRouter';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import './style/main.css';

ReactDOM.render((
  <Provider store={store}>
    <AppRouter />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
