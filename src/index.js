import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/App';

import rootReducer from './reducers';

// function logger(onj, next, action)
// logger(obj)(next)(action)
// const logger = function ({dispatch, getState}) {
//   return function (next) {
//     return function (action) {
//       // middleware code
//       console.log('ACTION_TYPE = ', action.type);
//       next(action);
//     }
//   }
// }

const logger = ({dispatch, getState}) => (next) => (action) => {

  // logger code/ middleware code

  console.log('ACTION_TYPE = ', action.type);
  next(action);
}

// const thunk=({dispatch, getState}) = store => next => action => {
//   if(typeof action === 'function'){
//     return action(store.dispatch);
//   }
//   next(action);
// };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

console.log('store', store);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);

