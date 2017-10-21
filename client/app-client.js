// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './AppRoot';
import { BrowserRouter } from 'react-router-dom';

window.onload = () => {
  ReactDOM.render((
  	<BrowserRouter>
  		<AppRoot/>
	</BrowserRouter>
  ), document.getElementById('main'));
};