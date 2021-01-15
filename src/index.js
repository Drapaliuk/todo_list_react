import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Routing } from './Routing';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Routing />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);