// src/routes.js
import React from 'react';
import { Provider } from 'react-redux';
import MusicMgrApp from './components/MusicMgrApp';

const Root = ({store}) => (
	<Provider store={store}>
	  <MusicMgrApp />
	</Provider>
);

export default Root;