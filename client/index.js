// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Root from './routes';
import RootReducer from './reducers';

//const loggerMiddleware = createLogger();

let rootStore = createStore(
	RootReducer,
	{},
	applyMiddleware(
		thunkMiddleware
//		loggerMiddleware
	)
);

ReactDOM.render(
  <Root store={rootStore} />,
  document.getElementById('root')
);