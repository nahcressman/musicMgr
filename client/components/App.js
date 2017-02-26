// src/components/App/index.js
import React, { Component } from 'react';
import Navigation from './Navigation';
import ContentViewContainer from './ContentViewContainer';

const App = ({location}) => {
	console.log("inside App, location is" + JSON.stringify({location}));

	return (
		<div>
			<Navigation/>
			<ContentViewContainer/>
		</div>
	)
}

export default App;