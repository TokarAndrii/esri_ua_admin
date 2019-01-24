import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './components/app/App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} path="/" />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
