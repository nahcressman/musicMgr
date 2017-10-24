// src/components/MusicMgrApp
import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import DashboardContainer from './Dashboard/DashboardContainer';

import Navigation from './Navigation';
import ContentViewContainer from './ContentViewContainer';

const MusicMgrApp = () => {
	return (
		<div className="app-content">
			<h1>Spotify Jukebox</h1>
			<Route exact path="/" render={props => (
				<ul>
					<li><Link to="/dashboard">Manage Your Jukebox</Link></li>
					<li><Link to="/participant">Join an existing session</Link></li>
				</ul>
			)}/>
			<Route path="/dashboard" component={DashboardContainer} />
		</div>
	);
};

export default MusicMgrApp;