// src/routes.js
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';
import SpotifyLogin from './components/SpotifyLogin';

const Root = ({store}) => (
	<Provider store={store}>
	  <Router history={browserHistory}>
	    <Route path="/" component={App} />
	    <Route path="/about" component={About} />
	    <Route path="*" component={NotFound} />
	  </Router>
	</Provider>
);

export default Root;