// src/components/MusicMgrApp
import React, { Component } from 'react';
import Navigation from './Navigation';
import ContentViewContainer from './ContentViewContainer';

const MusicMgrApp = ({location}) => {
	console.log("inside App, location is" + JSON.stringify({location}));

	return (
		<div>
			<Navigation/>
			<ContentViewContainer/>
		</div>
	)
}

export default MusicMgrApp;