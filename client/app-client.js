// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './AppRoot';

window.onload = () => {
  ReactDOM.render(<AppRoot/>, document.getElementById('main'));
};