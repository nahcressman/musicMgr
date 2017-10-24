// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from './reducers';
import MusicMgrApp from './components/MusicMgrApp';

const loggerMiddleware = createLogger();
const initialReduxState = typeof(window) !== 'undefined' ? JSON.parse(window.__REDUX_STATE__) : {};

let rootStore = createStore(
	RootReducer,
	initialReduxState,
	composeWithDevTools(
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
);

const AppRoot = () => (
	<Provider store={rootStore}>
	  <MusicMgrApp />
	</Provider>
);

export default AppRoot;