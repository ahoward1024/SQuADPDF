import React from 'react';
import {render} from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Reducer from './reducer';
import App from './App';
import * as serviceWorker from './serviceWorker';

// We set the initial state here instead of inside the reducer because then
// the state will actually be initialized for first use by the App component.
const initialState = {
  file: null,
  text: '',
  question: '',
  answer: '',
  loading: false,
  error: ''
};

export const store = createStore(Reducer, initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
