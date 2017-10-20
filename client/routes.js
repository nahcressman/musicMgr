// src/routes.js
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MusicMgrApp from './components/MusicMgrApp';
import About from './components/About';
import NotFound from './components/NotFound';

const Root = ({store}) => (
	<Provider store={store}>
	  <MusicMgrApp />
	</Provider>
);

export default Root;