// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import Root from './routes';
import RootReducer from './reducers';

const loggerMiddleware = createLogger();

let rootStore = createStore(
	RootReducer,
	composeWithDevTools(
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
);

const AppRoot = () => <Root store={rootStore} />

export default AppRoot;